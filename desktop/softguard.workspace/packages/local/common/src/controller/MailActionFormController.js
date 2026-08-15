Ext.define("Common.controller.MailActionFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "Common.model.SmartMailProgramFilterByModel",
    "Common.model.SmartMailProgramAttachFilterByModel",
    "SmartMailProgramModel",
    "SmartMailProgramSearchModel",
    "SmartMailSenderModel",
    "SmartMailTemplateSearchModel",
    "MailActionModel",
    "ActionModel",
    "SmartMailProgramAttachModel",
    "SMPAttachSearchModel",
    "AttachModel",
    "AttachSearchModel",
    "RelationModel",
  ],
  views: ["Common.view.MailActionFormView"],

  init: function (config) {
    // genero los eventos

    this.control({
      mailactionformview: {
        afterrender: this.initview,
        personselected: this.onPersonSelected,
      },

      'mailactionformview button[action="save"]': {
        click: this.onSaveClick,
      },

      'mailactionformview button[action="delete"]': {
        click: this.onDeleteClick,
      },

      'mailactionformview button[action="applyTemplate"]': {
        click: this.onApplyTemplateClick,
      },

      "mailactionformview #sender": {
        select: this.onSenderSelect,
      },

      "mailactionformview #body": {
        change: { fn: this.onEditorChangeDebounced, buffer: 3500 },
        keyup: { fn: this.onEditorChangeDebounced, buffer: 3500 },
      },

      "mailactionformview #asunto": {
        change: { fn: this.onEditorChangeDebounced, buffer: 3500 },
      },
    });
  }, // cierro init

  onEditorChangeDebounced: function (field) {
    var view = field.up("mailactionformview");
    var form = view.getForm();
    if (!form.isDirty()) return;

    if (this.isSaving) return;

    this.autoSave(view);
  },

  autoSave: function (view) {
    var me = this;
    var form = view.getForm();

    if (!form.isDirty()) return; // nada que guardar

    me.onSaveClick(view, { source: "auto", formView: view, form });
  },

  onPersonSelected: function (selection, view) {
    var parent = view.record;

    var relationModel = this.getRelationModelModel();
    var arrayEmails = [];
    if (Ext.util.Format.trim(view.down(view.targetField).getValue())) {
      arrayEmails.push(
        Ext.util.Format.trim(view.down(view.targetField).getValue()),
      );
    }
    Ext.Array.each(selection, function (record) {
      arrayEmails.push(
        record.get("Email") +
          " <" +
          record.get("Name") +
          " " +
          record.get("LastName") +
          ">",
      );
    });

    view.down(view.targetField).setValue(arrayEmails.join(", "));
  },

  initview: function (view) {
    var controller = this;

    view.loadRecord(view.record);
    var myform = view.getForm();
    var mymodel = myform.getRecord();
    if (isNaN(mymodel.id) || mymodel.id == null) {
      mymodel.set("Id", 0);

      //myform.updateRecord(mymodel);
      mymodel.save({
        callback: function (record, operation) {
          view.record = record;
          controller.setRecord(view);
        },
      });
    } else {
      controller.setRecord(view);
    }
  },

  setRecord: function (view) {
    var controller = this;
    var record = view.record;
    view.helperConfig = {
      xtype: "contextpersonhelperview",
      mismaOrganizacion: {
        record: view.recordOrganizacion,
        titleTab: getLocale("Emails"),
        multiSelect: true,
      },
      organizacionSecundaria: null,
      mostrarTodo: { mostrar: true, multiSelect: true },
    };

    // cargo los templates
    var templateStore = Ext.create("Ext.data.Store", {
      model: controller.getSmartMailTemplateSearchModelModel(),
    });
    var combo = view.down("#comboTemplate");
    combo.bindStore(templateStore);
    templateStore.load();

    // cargo los senders
    var senderStore = Ext.create("Ext.data.Store", {
      model: controller.getSmartMailSenderModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
    });
    var sendercombo = view.down("#sender");
    sendercombo.bindStore(senderStore);
    senderStore.load({
      callback: function (records) {
        if (records && records.length > 0) {
          sendercombo.setValue(records[0].get("AccountName"));
          controller.onSenderSelect(sendercombo, records);
        }
        view.records = records;
        // Keep a copy of all senders to detect/replace legacy signatures safely
        view.allSendersRecords = records;
      },
    });

    // cargo el registro
    view.loadRecord(record);
    var to = view.down("#to");
    var cc = view.down("#cc");
    var cco = view.down("#cco");
    var from = view.down("#sender");
    var body = view.down("#body");
    var subject = view.down("#asunto");

    if (record.get("Description") != "") {
      var metadata = Ext.JSON.decode(record.get("Description"));

      to.setValue(metadata.to);
      cc.setValue(metadata.cc);
      cco.setValue(metadata.cco);
      from.setValue(metadata.from);
      body.setValue(metadata.body);
      subject.setValue(metadata.subject);
    }

    if (view.bodyMail) {
      body.setValue(view.bodyMail);
    }
    if (view.hideTemplate) {
      view.down("#comboTemplate").hide();
    }
    view
      .down("smpattachgridview")
      .fireEvent("filtrar", view.record, view.down("smpattachgridview"));

    var smpStore = Ext.create("Ext.data.Store", {
      model: this.getSmartMailProgramFilterByModelModel(),

      pageSize: 50,
      remoteFilter: true,
      filters: [
        {
          property: "Action:RelationParent",
          value: record.getId(),
        },
      ],
    });
    smpStore.load({
      callback: function (records, operation, success) {
        if (success && records.length > 0) {
          var _to = records[0]
            .get("Query")
            .replace("select strval as Email from dbo.ParseArray( '", "")
            .replace("',',')", "");
          var _body = records[0].get("Body").replace(/[\n\t"]/g, "");
          to.setValue(_to);
          body.setValue(_body);

          // After restoring body from stored program, re-apply the current
          // sender's signature so it replaces any stale/accumulated signatures
          // in the stored body (fixes race condition between smpStore and senderStore).
          if (view.currentSender) {
            view.currentSender = null; // Reset so onSenderSelect processes it
            controller.onSenderSelect(sendercombo, view.records || []);
          }

          // Apply read-only view for already sent emails (same as DK-661 for SmartMailFormView)
          var smpStatus = records[0].get("Status");
          if (smpStatus === "A" || smpStatus === "C" || smpStatus === "P") {
            // Hide toolbar (Enviar, Eliminar, Template, Aplicar)
            view.down("toolbar").hide();

            // Hide sender combo, show read-only De displayfield
            from.hide();
            var fromField = view.down("#fromfield");
            if (fromField) {
              fromField.show();
              fromField.setValue(records[0].get("From") || "");
            }

            // Make "Para" (to) read-only and hide the add-contacts button
            to.setReadOnly(true);
            var toContainer = to.up("container");
            if (toContainer) {
              var addBtn = toContainer.down("button");
              if (addBtn) addBtn.hide();
            }

            // Make "Asunto" read-only
            subject.setReadOnly(true);

            // Ocultar Programar envío para correos ya enviados
            var programarEnvio = view.down("#programarEnvio");
            if (programarEnvio) programarEnvio.hide();

            // Hide HTML editor toolbar for sent emails
            setTimeout(function () {
              var viewDom = view.getEl() ? view.getEl().dom : null;
              if (viewDom) {
                var editorToolbars =
                  viewDom.getElementsByClassName("x-html-editor-tb");
                if (editorToolbars && editorToolbars.length) {
                  Array.from(editorToolbars).forEach(function (element) {
                    element.style.display = "none";
                  });
                }
              }
            });
          }
        }
      },
    });
  },
  lastOccurrence: function replaceLastOccurrence(
    str,
    searchValue,
    replaceValue,
  ) {
    // Find the index of the last occurrence of the searchValue
    const lastIndex = str.lastIndexOf(searchValue);

    // If the searchValue is not found, return the original string
    if (lastIndex === -1) {
      return str;
    }

    // Split the string into two parts and replace the last occurrence
    const before = str.substring(0, lastIndex);
    const after = str.substring(lastIndex + searchValue.length);

    // Return the string with the last occurrence replaced
    return before + replaceValue + after;
  },
  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo

    const isDRAFT = event.formView !== undefined;
    var myform = event.form ?? button.up("form").getForm();
    var view = event.formView ?? button.up("mailactionformview");
    var win = button.up("window");
    var recordOldSender = myform.getRecord();
    var attachStore = view.down("smpattachgridview").getStore();
    var attachArray = Ext.pluck(attachStore.data.items, "data");
    var attachData = Ext.pluck(attachArray, "Name");
    //var attachParam = attachData.join(",");
    var controller = this;
    myform.updateRecord(recordOldSender);
    var actionModel = controller.getActionModelModel();
    recordOldSender.getProxy().url = actionModel.getProxy().url;
    //recordOldSender.set('Name',recordOldSender.get('Name').slice(0,-1));
    recordOldSender.set(
      "Name",
      this.lastOccurrence(recordOldSender.get("Name"), ",", ""),
    );

    // Cambiamos el tipo a enviado solo en caso de que no sea DRAFT
    if (!isDRAFT) {
      recordOldSender.set("ActionType", "5");
    }

    recordOldSender.save();

    var model = this.getSmartMailProgramModelModel();
    var fechaDesde = new Date();
    var programarEnvio = view.down("#programarEnvio");
    if (programarEnvio && !programarEnvio.collapsed) {
      var programDate = view.down("#programstart").getValue();
      var programTime = view.down("#programtime").getValue();
      if (programDate) {
        fechaDesde = programDate;
        if (programTime) {
          fechaDesde.setHours(programTime.getHours());
          fechaDesde.setMinutes(programTime.getMinutes());
        }
      }
    }
    record = Ext.create(model, {
      Id: 0,
      DateStart: fechaDesde,
      Body: view.down("#body").getValue(),
      From: view.down("#sender").getValue(),
      Query: view.down("#to").getValue(),
      Name: view.down("#asunto").getValue(),
      DateEnd: new Date(1900, 1, 1),
      RecurrentDateEnd: new Date(1900, 1, 1),
      TransportType: "MAIL",
    });
    record.phantom = true;

    record.set(
      "Query",
      "select strval as Email from dbo.ParseArray( '" +
        record.get("Query").split(";").join(",") +
        "',',')",
    );

    // En caso de que sea DRAFT, no actualizamos el status del correo/entidad.
    if (!isDRAFT) {
      record.set("Status", "A");
    }

    this.isSaving = true;
    record.save({
      scope: this,
      win: win,
      view: view,
      callback: function (record, operation) {
        this.isSaving = false;

        if (operation.success) {
          if (isDRAFT) {
            notify("Se guardaron los cambios en borrador.");
          } else {
            notify("Se envio el correo.");
          }

          var params = {
            Id: record.get("Id"),
            CueIid: record.get("CueIid")
              ? record.get("CueIid")
              : record.get("cue_iid"),
          };
          var relationModel = "Common.model.RelationModel";
          var relation = Ext.create(relationModel, {
            Id: 0,
            ObjectTypeId: view.record.get("ObjectTypeId"),
            ObjectId: view.record.get("Id"), //AQUI TIENE QUE IR EL id del ActionMail
            RelationObjectTypeId: record.get("ObjectTypeId"),
            RelationObjectId: record.get("Id"),
          });
          relation.phantom = true;
          relation.save();

          if (view) {
            view.fireEvent("objectchanged", operation, view.record);

            if (win && !isDRAFT) {
              win.close();
            } else if (view.up("mailformview") && !isDRAFT) {
              view.up("mailformview").close();
            } else if (!isDRAFT) {
              view.close();
            }
          }

          //agrego los attach al programa
          Ext.Array.each(attachData, function (item) {
            controller.getSmartMailProgramAttachModelModel().create({
              Id: 0,
              Name: item,
              ProgramId: record.get("Id"),
            });
          });
        } else {
          notifyError("Hubo un error al guardar los datos");
        }
      },
      button: button,
    });
  },

  deleteAttachment: function (view) {
    //elimino los attachments iterando el store del grid de attachments
    var controller = this;
    var attachStore = view.down("smpattachgridview").getStore();
    var attachCount = attachStore.count();
    var attachModel = controller.getSmartMailProgramAttachModelModel();

    if (attachCount > 0) {
      attachStore.each(function (attachRecord) {
        attachModel.load(attachRecord.get("Id"), {
          callback: function (attach) {
            attach.erase({ callback: function () {} });
          },
        });
      });
    }
  },
  deleteActionMail: function (view) {
    //elimino el record de action mail
    var record = view.record;
    var win = view.up("window");
    record.erase({
      callback: function () {
        view.fireEvent("objectchanged");
        if (win) {
          win.close();
        } else {
          view.close();
        }

        if (view.caller) {
          var grid = view.caller;
          grid.down("pagingtoolbar").doRefresh();
        }
      },
    });
  },
  deleteAttachRelations: function (view) {
    var controller = this;
    var record = view.record; //record del action (mail)
    var smpAttachStore = Ext.create("Ext.data.Store", {
      model: controller.getSmartMailProgramAttachFilterByModelModel(),

      pageSize: 50,
      remoteFilter: true,
      filters: [
        {
          property: "Action:RelationParent",
          value: record.getId(),
        },
      ],
    });
    smpAttachStore.load({
      callback: function (records, operation, success) {
        var i = 1;
        if (success && records.length > 0) {
          records.forEach(function (r) {
            r.erase({
              callback: function () {
                if (i >= records.length) {
                  //elimino el action mail después de haber eliminado todas
                  //las relations
                  controller.deleteActionMail(view);
                }
              },
            });
          });
        } else {
          //si no hay relations elimino directamente el action mail
          controller.deleteActionMail(view);
        }
      },
    });
  },

  onDeleteClick: function (button, event, options) {
    var myform = button.up("form").getForm();
    var view = button.up("mailactionformview");

    var controller = this;

    var record = view.record;
    controller.deleteAttachment(view);

    // busco las relaciones entre el Action (mail) y el SmartMailProgram
    var smpStore = Ext.create("Ext.data.Store", {
      model: controller.getSmartMailProgramFilterByModelModel(),

      pageSize: 50,
      remoteFilter: true,
      filters: [
        {
          property: "Action:RelationParent",
          value: record.getId(),
        },
      ],
    });
    // recorro las relations y trato de eliminarlas
    smpStore.load({
      callback: function (records, operation, success) {
        if (success && records.length > 0) {
          // si encuentro una o más las elimino
          var i = 1;
          records.forEach(function (r) {
            r.erase({
              callback: function () {
                if (i >= records.length) {
                  controller.deleteAttachRelations(view); //elimino las relations del attach con el action
                }
                i++;
              },
            });
          });
        } else {
          //si no hay relations de smartmailprogram elimino los attachments directamente
          controller.deleteAttachRelations(view);
        }
      },
    });
  },

  onApplyTemplateClick: function (button, event, options) {
    var view = button.up("mailactionformview");
    var combo = view.down("#comboTemplate");
    var sendercombo = view.down("#sender");
    var program = view.record;
    var controller = this;

    var templateId = combo.getValue();
    var template = combo.getStore().findRecord("Id", templateId);

    // piso los valores de los campos
    view.down("#asunto").setValue(template.get("Subject"));
    view.down("#body").setValue(template.get("HtmlBody"));
    view.currentSender = null; // Reset so onSenderSelect re-applies signature to template body
    controller.onSenderSelect(sendercombo, view.records);

    // agrego los attach si hay
    var attachGrid = view.down("smpattachgridview");
    var attachStore = attachGrid.getStore(); //store de los attach del programa
    var attachModel = this.getSmartMailProgramAttachModelModel();
    var proxy = attachModel.getProxy();

    // borro todos los attach del programa
    attachGrid.fireEvent("deleteall", attachGrid);

    var store = Ext.create("Ext.data.Store", {
      model: this.getSMPAttachSearchModelModel(),
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      filters: [
        {
          property: template.get("ObjectTypeName") + ":RelationParent",
          value: template.get("Id"),
        },
      ],
    });

    store.load({
      callback: function (records) {
        Ext.Array.each(records, function (attach) {
          var found = attachStore.find("Name", attach.get("Name"));

          if (found == -1) {
            var programAttach = attachStore.add({
              Name: attach.get("Name"),
            });

            programAttach[0].setProxy(proxy);
            programAttach[0].save({
              callback: function (attach, operation) {
                // grabo la relacion
                var relationModel = controller.getRelationModelModel();
                var relation = Ext.create(relationModel);
                relation.set("ObjectTypeId", program.get("ObjectTypeId"));
                relation.set("ObjectId", program.get("Id"));
                relation.set(
                  "RelationObjectTypeId",
                  attach.get("ObjectTypeId"),
                );
                relation.set("RelationObjectId", attach.get("Id"));

                // guardo la relacion
                relation.save({
                  callback: function () {
                    // actualizo la grilla
                    attachStore.load();
                  },
                }); // cierro save relation
              },
            }); // cierro save programattach
          } // cierro if
        }); // cierro each
      },
    }); // cierro load
  },

  deleteObject: function (record) {
    record.destroy();
    //location.href = location.pathname;
  },

  /**
   * Strips any existing signature from the HTML body using multiple detection methods.
   * Returns the body without signature content.
   */
  stripExistingSignature: function (html, view, combo) {
    if (!html) return "";

    // Method 1: SG comment markers
    var startToken = "<!-- SG_SIGNATURE START -->";
    var endToken = "<!-- SG_SIGNATURE END -->";
    var start = html.indexOf(startToken);
    var end = start !== -1 ? html.indexOf(endToken, start) : -1;
    if (start !== -1 && end !== -1) {
      return (
        html.substring(0, start).replace(/[\s\n]*$/, "") +
        html.substring(end + endToken.length)
      );
    }

    // Method 2: sg-signature-wrapper class (element-based marker)
    var wrapperRe = /<div[^>]*\bsg-signature-wrapper\b[^>]*>[\s\S]*$/i;
    var wrapperMatch = wrapperRe.exec(html);
    if (wrapperMatch) {
      return html.substring(0, wrapperMatch.index).replace(/[\s\n]*$/, "");
    }

    // Method 3: div.firma with nesting-aware </div> matching
    var firmaPatterns = ['class="firma"', "class='firma'", "class=firma"];
    for (var p = 0; p < firmaPatterns.length; p++) {
      var low = html.toLowerCase();
      var firmaIdx = low.lastIndexOf(firmaPatterns[p]);
      if (firmaIdx !== -1) {
        var openIdx = html.lastIndexOf("<div", firmaIdx);
        if (openIdx !== -1) {
          // Count nested <div> to find the correct closing </div>
          var depth = 1;
          var searchStart = html.indexOf(">", openIdx) + 1;
          var closeIdx = -1;
          while (depth > 0 && searchStart < html.length) {
            var nextOpen = html.toLowerCase().indexOf("<div", searchStart);
            var nextClose = html.toLowerCase().indexOf("</div>", searchStart);
            if (nextClose === -1) break;
            if (nextOpen !== -1 && nextOpen < nextClose) {
              depth++;
              searchStart = nextOpen + 4;
            } else {
              depth--;
              if (depth === 0) {
                closeIdx = nextClose + "</div>".length;
              }
              searchStart = nextClose + "</div>".length;
            }
          }
          if (closeIdx !== -1) {
            // Also remove any preceding <br> before the firma div
            var beforeFirma = html.substring(0, openIdx);
            beforeFirma = beforeFirma.replace(/(<br\s*\/?>[\s\n]*)+$/i, "");
            return beforeFirma + html.substring(closeIdx);
          }
        }
      }
    }

    // Method 4: Known sender signatures (plain text match)
    var allSenders =
      view.allSendersRecords ||
      (combo.getStore ? combo.getStore().getRange() : []) ||
      [];
    var sigs = [];
    for (var i = 0; i < allSenders.length; i++) {
      var s =
        allSenders[i] && allSenders[i].get
          ? allSenders[i].get("Signature") || ""
          : "";
      if (s) sigs.push(s);
    }
    sigs.sort(function (a, b) {
      return b.length - a.length;
    });
    for (var j = 0; j < sigs.length; j++) {
      var sig = sigs[j];
      var pos = html.indexOf(sig);
      if (pos !== -1) {
        return (
          html.substring(0, pos).replace(/[\s\n]*$/, "") +
          html.substring(pos + sig.length)
        );
      }
    }

    // Method 5: Legacy marker <!-- Signature -->
    var legacyIdx = html.indexOf("<!-- Signature");
    if (legacyIdx !== -1) {
      return html.replace(/<!--\s*Signature[^>]*-->/gi, "");
    }

    // No signature found
    return null;
  },

  onSenderSelect: function (combo, records) {
    var view = combo.up("mailactionformview");
    var editor = view.down("#body");
    var body = editor.getValue() || "";

    var rec = Ext.isArray(records) ? records[0] : records;
    if (!rec) return;

    var account = rec.get("AccountName");

    // Guard: same sender already applied and markers present
    if (
      view.currentSender &&
      view.currentSender === account &&
      (body.indexOf("<!-- SG_SIGNATURE START -->") !== -1 ||
        body.indexOf("sg-signature-wrapper") !== -1)
    ) {
      return;
    }

    var signatureHtml = rec.get("Signature") || "";

    // Build signature block with both comment markers AND element wrapper
    // so detection survives even if the HtmlEditor strips comments.
    var signatureBlock =
      "<!-- SG_SIGNATURE START -->" +
      '<div class="sg-signature-wrapper">' +
      "<br/>" +
      '<div class="firma">' +
      signatureHtml +
      "</div>" +
      "</div>" +
      "<!-- SG_SIGNATURE END -->";

    // Step 1: Strip any existing signature from the body
    var stripped = this.stripExistingSignature(body, view, combo);

    // Step 2: Append the new signature block
    var cleanBody = stripped !== null ? stripped : body;
    var newBody = (cleanBody ? cleanBody + "\n" : "") + signatureBlock;

    if (newBody !== body) {
      editor.setValue(newBody);
    }

    view.records = [rec];
    view.currentSender = account;
  },
});
