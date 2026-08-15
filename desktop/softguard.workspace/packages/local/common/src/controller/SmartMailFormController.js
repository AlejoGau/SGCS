//MIGRADO2024
Ext.define("Common.controller.SmartMailFormController", {
  extend: "Ext.app.Controller",
  stores: [],
  models: [
    "SmartMailTemplateSearchModel",
    "SmartMailProgramAttachModel",
    "SMPAttachSearchModel",
    "SmartMailSenderModel",
    "SmartMailProgramModel",
  ],
  views: ["SmartMailFormView"],
  init: function (config) {
    // genero los eventos
    this.control({
      smartmailformview: {
        afterrender: this.initview,
      },
      'smartmailformview button[action="save"]': {
        click: this.onSaveClick,
      },
      'smartmailformview button[action="cancel"]': {
        click: this.onCancelClick,
      },
      'smartmailformview button[action="delete"]': {
        click: this.onDeleteClick,
      },
      'smartmailformview button[action="applyTemplate"]': {
        click: this.onApplyTemplateClick,
      },
      "smartmailformview #sender": {
        select: this.onSenderSelect,
      },
    });
  }, // cierro init
  initview: function (view) {
    var controller = this;
    const canLoad = view.record.get("Status") !== "C";

    // cargo los templates
    if (canLoad) {
      var templateStore = Ext.create("Ext.data.Store", {
        model: this.getSmartMailTemplateSearchModelModel(),
      });
      var combo = view.down("#comboTemplate");
      combo.bindStore(templateStore);
      templateStore.load();
      // cargo los senders
      var senderStore = Ext.create("Ext.data.Store", {
        model: this.getSmartMailSenderModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
      });
      var sendercombo = view.down("#sender");
      sendercombo.bindStore(senderStore);
      senderStore.load({
        callback: function (records) {
          if (records[0]) {
            sendercombo.setValue(records[0].get("AccountName"));
            controller.onSenderSelect(sendercombo, records);
            view.records = records;
            // Keep a copy of all senders to detect/replace legacy signatures safely
            view.allSendersRecords = records;
          }
        },
      });
    }
    if (!view.record) {
      var model = this.getSmartMailProgramModelModel();
      view.record = Ext.create(model, {
        DateStart: new Date(),
        Name: "",
      });
    }

    const shouldCallToHandler = Ext.util.Format.trim(
      view.record.get("Body")
    ).startsWith("http");
    const status = view.record.get("Status");
    const isNewEmail = (view.record.get("Name") == "Nuevo envío" || (status !== "C" && status !== "A" && status !== "P")) && !shouldCallToHandler;

    view.loadRecord(view.record);
    // DSS-1512 / fix: Para solo se oculta en "Envío masivo" (viene de OrganizationGrid/PersonGrid
    // con title "Envío masivo"). "Envío de mail" (desde SmartMailProgramGrid) y el modo standalone
    // (doble-clic en grilla) DEBEN mostrar Para.
    var parentSmartMailView = view.up("smartmailview");
    var isMasivoContext = !!(parentSmartMailView && parentSmartMailView.title === "Envío masivo");
    if (isNewEmail) {
      view.down("#asunto").setValue(null);
      if (!isMasivoContext) {
        var destinoFieldNew = view.down("#destino");
        if (destinoFieldNew) destinoFieldNew.show();
      }
    }

    const startDateIso = view.record.get("IsoDateStart") ?? new Date().toISOString();
    const endDateIso = view.record.get("IsoDateEnd") ?? new Date().toISOString();

    const sender = view.down("#destino");
    const senderOrigin = view.down("#sender");
    if (sender) {
      var destinoVal = view.record.get("Destino") || view.record.get("To");
      if (!destinoVal) {
        var q = view.record.get("Query") || "";
        var emails = q.match(/[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}/g);
        destinoVal = emails && emails.length ? emails.join(",") : destinoVal;
      }
      sender.setValue(destinoVal);
    }

    view.down("#fromfield").setValue(view.record.get("From"));

    view.down("#programtime").setValue(startDateIso);
    view.down("#programstart").setValue(startDateIso);

    // Habilitar sección de adjuntos para registros ya guardados (Id > 0)
    if (view.record.get("Id") > 0) {
      view.down("#adjuntos").setDisabled(false);
    }

    if (view.readonly) {
      view.disableForm();
      view.down("toolbar").hide();
      // Re-habilitar adjuntos para visualización (disableForm los deshabilita)
      if (view.record.get("Id") > 0) {
        view.down("#adjuntos").setDisabled(false);
      }
      
      // Ocultar botón de carga en modo solo lectura
      var smpGrid = view.down("smpattachgridview");
      if (smpGrid) {
        var adjuntarBtn = smpGrid.down("#adjuntararchivoId");
        if (adjuntarBtn) adjuntarBtn.hide();
      }
      view.down("#sender").hide();
      view.down("#fromfield").show();
      view.down("#fromfield").setValue(view.record.get("From"));
      // Ocultar Programar envío en correos ya enviados
      view.down("#programarEnvio").hide();
    }


    if (shouldCallToHandler) {
      view.down("#body").hide();
      view.down("#iframe").show();
      view.down("#iframe").load({
        src: Ext.util.Format.trim(view.record.get("Body")),
      });
      if (!isNewEmail) {
        if (!isMasivoContext) sender.show();
        senderOrigin.hide();
        view.down("toolbar").hide();
        view.down("#fromfield").show();
        view.down("#fromfield").setValue(view.record.get("From"));
        view.down("#programarEnvio").hide();
      }
    } else if (!isNewEmail) {
      view.down("#iframe").hide();
      const editor = view.down("#body");

      const body =
        editor &&
        editor.bodyEl &&
        editor.bodyEl.dom &&
        editor.bodyEl.dom.children[0];
      // view.down("#body").show();
      editor.setHtml(Ext.util.Format.trim(view.record.get("Body")));


      if (!isMasivoContext) sender.show();
      senderOrigin.hide();

      // view.disableForm();
      view.down("toolbar").hide();
      view.down("#fromfield").show();
      view.down("#fromfield").setValue(view.record.get("From"));
      // Ocultar Programar envío para correos ya enviados
      view.down("#programarEnvio").hide();

      setTimeout(() => {
        const elementsToHide = document.getElementsByClassName(
          "x-component x-html-editor-input x-box-item x-component-default"
        );
        if (elementsToHide && elementsToHide.length) {
          Array.from(elementsToHide).forEach(
            (element) => (element.style.display = "none")
          );
        }

        const elementsToolbar = document.getElementsByClassName(
          "x-toolbar x-html-editor-tb x-box-item x-toolbar-default"
        );
        if (elementsToolbar && elementsToolbar.length) {
          Array.from(elementsToolbar).forEach(
            (element) => (element.style.display = "none")
          );
        }

        if (body) {
          body.style.height = "2000px";
          body.querySelector("[role='presentation']").style.height = "2000px";
        }
      });

      // editor.disable();
    }
  },

  openWindow: function (record) {
    var title = record.get("Name"); //reemplazar por config
    var view = Ext.widget("smartmailformview", {
      record: record,
      //callback: this.onEdit,
      scope: this,
    });
    var myWindow = Ext.widget("window", {
      title: title,
      height: 400,
      width: 400,
      modal: true,
      items: view,
      layout: "fit",
    }).show();
  },
  onSaveClick: function (button, event, options) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up("form").getForm();
    var view = button.up("smartmailformview");
    var win = button.up("window");
    var record = myform.getRecord();
    myform.updateRecord(record);
    // Tomar el Destino del formulario y traducirlo a Query (formato ParseArray)
    var destinoField = view.down("#destino");
    if (destinoField) {
      var rawDestino = Ext.String.trim(destinoField.getValue() || "");
      if (rawDestino) {
        // Extraer solo direcciones de email válidas (soporta múltiples separados por , ; o con nombres <email>)
        var emails = rawDestino.match(/[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}/g) || [];
        // Normalizar y deduplicar
        var unique = {};
        var clean = [];
        for (var i = 0; i < emails.length; i++) {
          var e = emails[i].toLowerCase();
          if (!unique[e]) { unique[e] = true; clean.push(e); }
        }
        if (clean.length) {
          var destinos = clean.join(",");
          var parseArraySql =
            "select strval as Email from dbo.ParseArray( '" +
            destinos +
            "',',')";
          record.set("Query", parseArraySql);
        }
      }
    }
    if (record.get("DateEnd") == null) {
      record.set("DateEnd", new Date(-62135586000000));
    }
    if (record.get("DateStart") == null) {
      record.set("DateStart", new Date());
    }
    if (record.get("RecurrentDateEnd") == null) {
      record.set("RecurrentDateEnd", new Date(-62135586000000));
    }
    if (
      record.get("TransportType") == null ||
      record.get("TransportType") == ""
    ) {
      record.set("TransportType", "MAIL");
    }
    // agrego la hora del programa
    var fechaDesde = record.get("DateStart");
    var tiempoDesde = view.down("#programtime").getValue();
    if (tiempoDesde) {
      fechaDesde.setHours(tiempoDesde.getHours());
      fechaDesde.setMinutes(tiempoDesde.getMinutes());
      record.set("DateStart", fechaDesde);
    }
    record.set("Status", "A");
    record.save({
      scope: this,
      win: win,
      view: view,
      callback: function (record, operation) {
        if (operation.success) {
          if (record.get("Status") == "A" && !tiempoDesde) {
            notify("Se envío el correo con exito");
          } else if (record.get("Status") == "A" && tiempoDesde) {
            notify("Se programo el envio del correo correctamente");
          } else {
            notify("Se guardó el correo como INACTIVO");
          }
          if (view) {
            view.fireEvent("objectchanged", operation);
            if (win) {
              win.close();
            } else if (view.up("smartmailview")) {
              view.up("smartmailview").close();
            } else {
              view.close();
            }
          }
        } else {
          notifyError("Hubo un error al guardar los datos");
        }
      },
      button: button,
    });
  },
  onDeleteClick: function (button, event, options) {
    var controller = this;
    var myform = button.up("form").getForm();
    var view = button.up("smartmailformview");
    var win = button.up("window");
    var record = myform.getRecord();
    var recordId = record.get('Id');

    // Confirm deletion
    Ext.Msg.confirm('Confirmar', '¿Está seguro que desea eliminar este correo?', function(btn) {
      if (btn === 'yes') {
        var date = new Date();
        // Delete using direct Ajax request
        Ext.Ajax.request({
          url: '/Rest/SmartMailProgram/' + recordId + '?dc=' + date.getTime(),
          method: 'DELETE',
          success: function(response, operation) {
            if (operation.success) {
              notify('El correo se eliminó con éxito');
              view.fireEvent("objectchanged");

              // Reset form to clean state and force close without prompts
              myform.reset();
              view.forceClose = true;

              // Close window after successful deletion
              if (win) {
                win.forceClose = true;
                win.close();
              } else if (view.up("smartmailview")) {
                var smartmailview = view.up("smartmailview");
                smartmailview.forceClose = true;
                smartmailview.close();
              } else {
                view.close();
              }
            }
          },
          failure: function(response) {
            notifyError('Hubo un error al eliminar el correo');
          }
        });
      }
    });
  },

  onCancelClick: function (button, event, options) {
    var myform = button.up("form").getForm();
    var view = button.up("smartmailformview");
    var myWin = button.up("window");
    var record = myform.getRecord();

    // Check if this is a new unsaved email or has unsaved changes
    var isNewEmail = (record.get("Name") == "Nuevo envío" || record.get("Name") == null || record.get("Name") == "");
    var isDirty = myform.isDirty();

    // If there are changes, ask if user wants to save as draft
    if (isDirty && isNewEmail) {
      Ext.Msg.confirm('Guardar borrador', '¿Desea guardar los cambios como borrador?', function(btn) {
        if (btn === 'yes') {
          // Update record with form data
          myform.updateRecord(record);

          // Set minimal required fields for draft
          if (record.get("DateEnd") == null) {
            record.set("DateEnd", new Date(-62135586000000));
          }
          if (record.get("DateStart") == null) {
            record.set("DateStart", new Date());
          }
          if (record.get("RecurrentDateEnd") == null) {
            record.set("RecurrentDateEnd", new Date(-62135586000000));
          }
          if (record.get("TransportType") == null || record.get("TransportType") == "") {
            record.set("TransportType", "MAIL");
          }

          // Save as INACTIVE (draft)
          record.set("Status", "I");

          record.save({
            callback: function(record, operation) {
              if (operation.success) {
                notify('El correo se guardó como borrador');
                view.fireEvent("objectchanged", operation);
              }
              // Close window regardless
              if (myWin) {
                myWin.close();
              } else {
                var tab = view;
                if (tab) tab.close();
              }
            }
          });
        } else {
          // User chose not to save, just close
          if (myWin) {
            myWin.close();
          } else {
            var tab = view;
            if (tab) tab.close();
          }
        }
      });
    } else {
      // No changes or not a new email, just close
      if (myWin) {
        myWin.close();
      } else {
        var tab = view;
        if (tab) tab.close();
      }
    }
  },

  onApplyTemplateClick: function (button, event, options) {
    var controller = this;
    var view = button.up("smartmailformview");
    var combo = view.down("#comboTemplate");
    var sendercombo = view.down("#sender");
    var program = view.record;
    var templateId = combo.getValue();
    var template = combo.getStore().findRecord("Id", templateId);

    // piso los valores de los campos
    view.down("#asunto").setValue(template.get("Subject"));
    view.down("#body").setValue(template.get("HtmlBody"));
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
              ProgramId: program.get("Id"),
            });
            programAttach[0].setProxy(proxy);

            programAttach[0].save();
          }
        });
      },
    });
  },

  deleteObject: function (record) {
    record.destroy();
    //location.href = location.pathname;
  },

  onSenderSelect: function (combo, records) {
    var view = combo.up("smartmailformview");
    var editor = view.down("#body");
    var body = editor.getValue() || "";

    var rec = Ext.isArray(records) ? records[0] : records;
    if (!rec) return;

    var account = rec.get("AccountName");
    if (view.currentSender && view.currentSender === account && body.indexOf("<!-- SG_SIGNATURE START -->") !== -1) {
      return;
    }

    var signatureHtml = rec.get("Signature") || "";
    var signatureBlock = "<!-- SG_SIGNATURE START -->\n" +
      "<br/>\n" +
      "<div class=\"firma\">" + signatureHtml + "</div>\n" +
      "<!-- SG_SIGNATURE END -->";

    var replaceWithBlock = function (html) {
      if (!html) html = "";
      var startToken = "<!-- SG_SIGNATURE START -->";
      var endToken = "<!-- SG_SIGNATURE END -->";
      var start = html.indexOf(startToken);
      var end = start !== -1 ? html.indexOf(endToken, start) : -1;

      // 1) Bloque existente: solo reemplazo el contenido del div.firma
      if (start !== -1 && end !== -1) {
        var beforeAll = html.substring(0, start);
        var blockContent = html.substring(start + startToken.length, end); // contenido entre START y END (sin tokens)
        var afterAll = html.substring(end + endToken.length);

        // Regex para encontrar el div.firma (case-insensitive, tolera atributos)
        var firmaRe = /(<div[^>]*class=(?:"|')[^"']*?\bfirma\b[^"']*(?:"|')[^>]*>)([\s\S]*?)(<\/div>)/i;
        if (firmaRe.test(blockContent)) {
          // Solo reemplazo el interior, preservando cualquier texto anterior al div dentro del bloque
          blockContent = blockContent.replace(firmaRe, "$1" + signatureHtml + "$3");
          // Aseguro al menos un <br/> antes del div.firma si el usuario escribió algo justo pegado
          // (solo si no existe ya un <br> inmediatamente antes del <div class="firma">)
          blockContent = blockContent.replace(/([^\n>])(<div[^>]*class=(?:"|')[^"']*\bfirma\b[^"']*(?:"|')[^>]*>)/i, function (_, prevChar, divStart) {
            // si justo antes no hay <br
            if (!/(<br\s*\/?>|\n)$/.test(prevChar)) {
              return prevChar + "<br/>\n" + divStart;
            }
            return prevChar + divStart;
          });
          return beforeAll + startToken + blockContent + endToken + afterAll;
        } else {
          // No hay div.firma dentro del bloque: reemplazo SOLO el contenido interno, no lo que está fuera
          blockContent = "\n<br/>\n<div class=\"firma\">" + signatureHtml + "</div>\n";
          return beforeAll + startToken + blockContent + endToken + afterAll;
        }
      }
      // ...existing code...
      // 2) Caso legacy: div.firma aislado
      var firmaIdx = (function () {
        var low = html.toLowerCase();
        var idx = low.lastIndexOf('class="firma"');
        if (idx === -1) idx = low.lastIndexOf("class='firma'");
        if (idx === -1) idx = low.lastIndexOf(' class="firma');
        return idx;
      })();
      if (firmaIdx !== -1) {
        var openIdx = html.lastIndexOf('<div', firmaIdx);
        var closeIdx = html.indexOf('</div>', firmaIdx);
        if (openIdx !== -1 && closeIdx !== -1) {
          closeIdx += '</div>'.length;
          var beforeFirma = html.substring(0, openIdx);
          var afterFirma = html.substring(closeIdx);
          // preservo beforeFirma tal cual (no trim para no comer texto pegado)
          return beforeFirma + signatureBlock + afterFirma;
        }
      }

      // 3) Firmas conocidas (fallback) – se mantiene tu lógica original
      var allSenders = view.allSendersRecords || (combo.getStore ? combo.getStore().getRange() : []) || [];
      var sigs = [];
      for (var i = 0; i < allSenders.length; i++) {
        var s = allSenders[i] && allSenders[i].get ? (allSenders[i].get("Signature") || "") : "";
        if (s) sigs.push(s);
      }
      sigs.sort(function (a, b) { return b.length - a.length; });
      for (var j = 0; j < sigs.length; j++) {
        var sig = sigs[j];
        var pos = html.indexOf(sig);
        if (pos !== -1) {
          var beforeKnown = html.substring(0, pos);
          var afterKnown = html.substring(pos + sig.length);
          return beforeKnown + signatureBlock + afterKnown;
        }
      }

      // 4) Legacy marker <!-- Signature -->
      var legacyIdx = html.indexOf("<!-- Signature");
      if (legacyIdx !== -1) {
        var withoutMarker = html.replace(/<!--\s*Signature[^>]*-->/i, "");
        return withoutMarker + "\n" + signatureBlock;
      }

      // 5) No había nada: agrego al final
      return (html ? html + "\n" : "") + signatureBlock;
    };

    var newBody = replaceWithBlock(body);
    if (newBody !== body) {
      editor.setValue(newBody);
    }

    view.records = [rec];
    view.currentSender = account;
  },
});
