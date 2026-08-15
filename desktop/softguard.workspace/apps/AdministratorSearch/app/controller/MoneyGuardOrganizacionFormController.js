Ext.define(
  "AdministratorSearch.controller.MoneyGuardOrganizacionFormController",
  {
    extend: "Ext.app.Controller",
    views: ["MoneyGuardOrganizacionFormView", "UploadButton"],
    stores: ["ProvinciasStore"],
    models: [
      "OrganizationSearchModel",
      "t_organizacion_fcModel",
      "t_provinciasSearchModel",
      "t_categorias_impositivas_fcSearchModel",
    ],
    init: function (config) {
      // genero los eventos

      this.control({
        moneyguardorganizacionformview: {
          beforerender: this.initview,
          organizationchanged: this.onOrganizationChanged,
        },
        'moneyguardorganizacionformview button[action="save"]': {
          click: this.onSaveClick,
        },
        "moneyguardorganizacionformview #btnConfigurar": {
          click: this.onConfigurarClick,
        },
        'moneyguardorganizacionformview button[action="organizationChange"]': {
          click: this.onOrganizationChangeClick,
        },
        'moneyguardorganizacionformview button[action="logo"]': {
          click: this.onLogoClick,
        },
        'moneyguardorganizacionformview button[action="applyTemplate"]': {
          click: this.onApplyTemplateClick,
        },
        'moneyguardorganizacionformview button[action="insertVariable"]': {
          click: this.onInsertVariableClick,
        },
        'moneyguardorganizacionformview button[action="previewFactura"]': {
          click: this.onPreviewFacturaClick,
        },
        'moneyguardorganizacionformview button[action="facturaLogo"]': {
          click: this.onFacturaLogoClick,
        },
        'moneyguardorganizacionformview checkboxfield[action="toggleIntegration"]': {
          change: this.onIntegrationToggleChange,
        },
      });
    }, // cierro init

    initview: function (view) {
      try {
      var controller = this;
      var record = view.record;
      var rawId = record.get("Id");
      var hasNumericId = Ext.isNumeric(rawId) && Number(rawId) > 0;
      var persistedId = hasNumericId ? Number(rawId) : 0;
      var isNew = record.phantom === true || !hasNumericId;
      var categoriaCombo = view.down("#categoriaimpositiva");

      // Crear store de categorías impositivas
      var catFilters = [];
      if (!isNew) {
        catFilters.push({
          property: "cat_orgicodigoid",
          value: persistedId,
          id: "cat_orgicodigoid",
        });
      }
      view.store = Ext.create("Ext.data.Store", {
        model: this.getT_categorias_impositivas_fcSearchModelModel(),
        pageSize: 5000,
        remoteSort: true,
        remoteFilter: true,
        filters: catFilters,
      });
      categoriaCombo.bindStore(view.store);

      if (isNew) {
        // Organización nueva: categoría deshabilitada hasta que se guarde
        categoriaCombo.setDisabled(true);
        categoriaCombo.emptyText = 'Guarde la organización primero';
        if (categoriaCombo.rendered && Ext.isFunction(categoriaCombo.applyEmptyText)) { categoriaCombo.applyEmptyText(); }
        // Aplicar aspecto grisado directo al DOM una vez renderizado
        view.on('afterrender', function() {
            setTimeout(function() {
                var inputEl = document.getElementById(categoriaCombo.id + '-inputEl');
                var triggerWrap = document.getElementById(categoriaCombo.id + '-triggerWrap');
                if (inputEl) { inputEl.style.backgroundColor = '#e0e0e0'; inputEl.style.color = '#999'; }
                if (triggerWrap) { triggerWrap.style.opacity = '0.3'; }
            }, 100);
        }, null, { single: true });
      } else {
        // Organización existente: habilitar y cargar categorías filtradas
        categoriaCombo.setDisabled(false);
        categoriaCombo.emptyText = '';
        if (categoriaCombo.rendered && Ext.isFunction(categoriaCombo.applyEmptyText)) { categoriaCombo.applyEmptyText(); }
        view.store.load();
      }

      view.loadRecord(view.record);

      // Load factura config from org_cmetadata
      this.loadFacturaConfig(view, record);

      // Prevenir cierre de ventana sin categoría impositiva completada (solo si org ya fue guardada)
      var win = view.up("window");
      if (win) {
        win.on("beforeclose", function () {
          var rec = view.record;
          var closeRawId = rec.get("Id");
          var orgId = Ext.isNumeric(closeRawId) ? Number(closeRawId) : 0;
          if (orgId > 0) {
            var catVal = categoriaCombo.getValue();
            if (!catVal || catVal === "") {
              Ext.MessageBox.alert(
                "Campo obligatorio",
                "Debe completar el campo de Categoría Impositiva antes de cerrar.",
              );
              return false;
            }
          }
          return true;
        });
      }

      var moneda = view.down("#moneda");
      if (moneda && moneda.setValue) {
        moneda.setValue(view.record.get("org_csymbol"));
      }

      // seteo la organizacion seleccionada
      var organizationId = parseInt(record.get("org_organizacionId"));
      var form = view.getForm();
      var field = form.findField("_organization");
      if (organizationId) {
        var store = Ext.create("Ext.data.Store", {
          model: this.getOrganizationSearchModelModel(),
          remoteSort: true,
          filters: [
            {
              property: "o.Id",
              value: organizationId,
            },
          ],
          remoteFilter: true,
        });

        store.load({
          callback: function (records, operation, success) {
            if (success) {
              var record = records[0];

              var user = view.record;

              if (record) {
                field.setValue(record.get("Name"));
                field.clearInvalid();
              } else {
                field.setValue(getLocale("No hay una organización asignada"));
              }
              view.resetOriginal();
            }
          },
        });
      } else {
        field.setValue(getLocale("No hay una organización asignada"));
      }

      //view.resetOriginal();
      } catch (e) {
        console.error('[initview ERROR]', e && e.message, e && e.stack);
      }
    },

    onApplyTemplateClick: function (button, event, options) {
      var view = button.up("moneyguardorganizacionformview");
      var form = view.getForm();
      var record = view.record;
      var controller = this;
      var params = {};

      params.org_icodigo_id = record.get("Id");
      Ext.Ajax.request({
        url: "/rest/search/mg_organizationApplyTemplate",
        method: "GET",
        params: params,
        success: function (resp, operation) {
          notify("El template se aplicó con éxito");
        },
        failure: function (resp, operation) {
          console.log(resp);
        },
      });
    },

    onLogoClick: function (button, event, options) {
      var view = button.up("moneyguardorganizacionformview");
      var form = view.getForm();
      var record = view.record;
      var controller = this;
      var photo = "logo_" + record.get("Id") + ".jpg";

      var w = Ext.widget("window", {
        title: "Foto: ",
        height: 300,
        width: 400,
        closeAction: "destroy",
        border: false,
        //layout : 'fit',
        record: record,
        tbar: [
          Ext.create("AdministratorSearch.view.UploadButton", {
            id: "dragupload",
            text: "Logo",
            plugins: [
              {
                ptype: "uploadwindow",
                title: "Subir Logo",
                width: 350,
                height: 150,
              },
            ],
            uploader: {
              url: "/rest/upload/new?search=softguardMiscFile",
              uploadpath: "",
              multi_selection: false,
              autoStart: true,
              unique_names: false,
              maxFileSize: "50mb",
              path: "Moneyguard",
              filters: {
                mime_types: [
                  { title: "Archivos de imagen", extensions: "jpg" },
                ],
              },
              drop_element: "LogoImage",
              statusQueuedText: getLocale("Listo para subir"),
              statusUploadingText: getLocale("Subiendo") + " ({0}%)",
              statusFailedText: '<span style="color: red">Error</span>',
              statusDoneText: '<span style="color: green">Completo</span>',

              statusInvalidSizeText: "Archivo demasiado largo",
              statusInvalidExtensionText: "Formato inválido",
            },
            listeners: {
              filesadded: function (uploader, files) {
                var file = files[0];
                file.name = photo;
                file.target_name = photo;
                return true;
              },
              beforeupload: function (uploader, file) {
                file.name = photo;
                file.target_name = photo;
                var url = "/rest/upload/new?search=softguardMiscFile";
                if (uploader.path) {
                  url = url + "&Path=" + uploader.path;
                }
                url += "&filename=" + photo;
                uploader.uploader.settings.url = url;
              },
              fileuploaded: function (uploader, file) {
                //console.log('fileuploaded');
              },
              uploadcomplete: function (uploader, success, failed) {
                var file = success.pop();
                w.down("image").setSrc(
                  "/gallery/Moneyguard/" + file.name + "?_dc=" + Date.now(),
                );
                //form.findField('_logo').setValue(file.name);
              },
              scope: this,
            },
          }),
        ],
        items: [
          {
            xtype: "image",
            src: "/gallery/Moneyguard/" + photo + "?_dc=" + Date.now(),
            style: { objectFit: "cover", maxWidth: "100%", maxHeight: "100%" },
            id: "LogoImage",
            itemId: "LogoImage",
          },
        ],
        autoShow: true,
        modal: true,
        listeners: {
          resize: function (win, width, height) {
            if (typeof arguments[1] !== "object") {
              var _img = win.down("image");
              var h = _img.getHeight();
              var w = _img.getWidth();
              if (h > w) {
                _img.setHeight("auto");
                _img.setWidth(win.body.getWidth());
              } else {
                _img.setHeight(win.body.getHeight());
                _img.setWidth("auto");
              }
            }
          },
        },
      });
      w.model = form.getRecord();
      w.on;

      if (view.readOnly) {
        w.down("toolbar").hide();
      }
    },

    onOrganizationChanged: function (record, view) {
      if (record) {
        view.record.set("org_organizacionId", record.get("Id").toString());
        view.getForm().findField("_organization").setValue(record.get("Name"));
      } else {
        view.record.set("org_organizacionId", "");
        view.getForm().findField("_organization").setValue("");
      }
    },

    onConfigurarClick: function (button) {
      var view = button.up("moneyguardorganizacionformview");
      var myform = button.up("form").getForm();
      var record = myform.getRecord();

      if (record) {
        myform.updateRecord(record);

        var factelectField = view.down('[name="org_factelect"]');
        if (factelectField) {
          record.set('org_factelect', factelectField.getValue() || '');
        }
      }

      Ext.create("Ext.window.Window", {
        title: "Configuración",
        height: 700,
        width: 600,
        layout: "fit",
        items: {
          // Let's put an empty grid in just to illustrate fit layout
          xtype: "orgcmetadataformview",
          record: record,
        },
      }).show();
    },

    onOrganizationChangeClick: function (button, event, options) {
      var view = button.up("moneyguardorganizacionformview");
      var controller = this;
      var filter = [];
      this.isMasterWebDealer(function (isMaster) {
        if (isMaster) {
          Ext.Ajax.request({
            url: "/rest/security/UserData",
            success: function (resp, operation) {
              if (resp.responseText) {
                var metadata = Ext.JSON.decode(resp.responseText);
                if (metadata) {
                  var modules = SecurityModulesStore; //controller.getSecurityModulesStoreStore();
                  var administratorModule = modules.findRecord(
                    "KeyReference",
                    "Administrator",
                  );
                  if (!administratorModule.get("Available")) {
                    filter.push({
                      property: "Organization:RelationParent",
                      value: metadata.Company,
                    });
                  }

                  var win = Ext.create("Ext.Window", {
                    layout: "fit",
                    title: "Seleccione una entidad",
                    closeAction: "destroy",
                    caller: view,
                    modal: true,
                    width: 600,
                    height: 400,
                    border: false,
                    items: {
                      xtype: "organizationhelperview",
                      title: "",
                      forceStatus: "7,8,9",
                      forceType: "CENTRAL",
                      hideTaxo: true,
                      caller: view,
                      filter: filter,
                    },
                  });
                  win.show();
                }
              }
            },
          });
        } else {
          var win = Ext.create("Ext.Window", {
            layout: "fit",
            title: "Seleccione una entidad",
            closeAction: "destroy",
            caller: view,
            modal: true,
            width: 600,
            height: 400,
            border: false,
            items: {
              xtype: "organizationhelperview",
              title: "",
              forceStatus: "7,8,9",
              forceType: "CENTRAL",
              hideTaxo: true,
              caller: view,
              filter: filter,
            },
          });
          win.show();
        }
      });
    },

    onSaveClick: function (button, event, options) {
      // cambio la cantidad de columnas al panel
      // accedo al registro y lo salvo
      var myform = button.up("form").getForm();
      var view = button.up("moneyguardorganizacionformview");
      var win = button.up("window");
      var record = myform.getRecord();
      var controller = this;
      var rawId = record.get("Id");
      var isNew = record.phantom === true || !(Ext.isNumeric(rawId) && Number(rawId) > 0);
      var categoriaCombo = view.down("#categoriaimpositiva");

      // Si la organización ya existe, la categoría impositiva es obligatoria
      if (!isNew) {
        var catVal = categoriaCombo.getValue();
        if (!catVal || catVal === "") {
          Ext.MessageBox.alert(
            "Campo obligatorio",
            "Debe completar el campo de Categoría Impositiva antes de guardar.",
          );
          return;
        }
      }

      myform.updateRecord(record);

      var organizationName = String(record.get("org_cnombre") || "").replace(/^[\s\u00a0]+|[\s\u00a0]+$/g, "");
      if (!organizationName) {
        organizationName = String(record.get("Name") || "");
      }
      record.set("Name", organizationName);

      if (isNew) {
        // ExtJS asigna un Id fantasma string (ej. Model-1) a registros nuevos.
        // El backend WCF deserializa Id como Int32 y falla si recibe ese valor.
        record.set("Id", 0);
      }

      if (myform.isValid()) {
        record.set("org_csymbol", view.down("#moneda").getValue());

        record.set(
          "org_cinicioactividades",
          Ext.Date.format(
            new Date(record.get("org_cinicioactividades")),
            "Y-m-d",
          ),
        );

        // Merge factura config into org_cmetadata before saving
        this.saveFacturaConfig(view, record);

        record.save({
          scope: this,

          view: view,
          callback: function (record, operation) {
            if (operation.success) {
              if (isNew) {
                // Primera vez guardada: habilitar categoría impositiva y filtrar por org ID
                var newId = record.get("Id");
                categoriaCombo.setDisabled(false);
                categoriaCombo.emptyText = '';
                if (categoriaCombo.rendered && Ext.isFunction(categoriaCombo.applyEmptyText)) { categoriaCombo.applyEmptyText(); }
                var inputEl = document.getElementById(categoriaCombo.id + '-inputEl');
                var triggerWrap = document.getElementById(categoriaCombo.id + '-triggerWrap');
                if (inputEl) { inputEl.style.backgroundColor = ''; inputEl.style.color = ''; }
                if (triggerWrap) { triggerWrap.style.opacity = ''; }

                // Aplicar template: crea automáticamente categorías impositivas,
                // impuestos, etc. para la nueva organización (DK-1654)
                Ext.Ajax.request({
                  url: "/rest/search/mg_organizationApplyTemplate",
                  method: "GET",
                  params: { org_icodigo_id: newId },
                  success: function () {
                    view.store.clearFilter(true);
                    view.store.filter({
                      property: "cat_orgicodigoid",
                      value: newId,
                      id: "cat_orgicodigoid",
                    });
                  },
                  failure: function (resp) {
                    console.error('[mg_organizationApplyTemplate ERROR]', resp);
                    notifyError(
                      "No se pudieron crear las categorías impositivas automáticamente. Use el botón 'Aplicar template'.",
                    );
                  },
                });

                notify("La organización se guardó correctamente.");
                Ext.MessageBox.alert(
                  "Atención",
                  "Debe completar el campo de Categoría Impositiva para finalizar la configuración.",
                );
                // NO cerrar la ventana, el usuario debe completar la categoría
              } else {
                var win = view.up("window");
                notify("Los datos se guardaron correctamente");
                if (view.caller && view.caller.fireEvent) {
                  view.caller.fireEvent("objectchanged", view.caller, record);
                }
                if (win && win.close) {
                  win.close();
                }
              }
            } else {
              notifyError("Hubo un error al guardar los datos");
            }
          },
          button: button,
        });
      }
    },

    isMasterWebDealer: function (callback) {
      var modules = SecurityModulesStore; //this.getSecurityModulesStoreStore();

      var masterModule = modules.findRecord("KeyReference", "MasterWebDealer");
      if (
        masterModule.get("KeyReference") == "MasterWebDealer" &&
        masterModule.get("Available")
      ) {
        callback(true);
      } else {
        callback(false);
      }
    },

    getDefaultIntegracionesPago: function () {
      return {
        transferencia: {
          habilitado: false,
          banco: "",
          cbu: "",
          alias: "",
          titular: "",
          cuit_titular: "",
        },
        mercadopago: {
          habilitado: false,
          tipo: "link_fijo",
          url: "",
          mostrar_qr: false,
        },
        pagofacil: {
          habilitado: false,
          codigo_entidad: "",
          template_codigo: "{{codigo_entidad}}{{cliente_numero}}",
        },
        rapipago: {
          habilitado: false,
          codigo_entidad: "",
          template_codigo: "{{codigo_entidad}}{{cliente_numero}}",
        },
        debito_automatico: {
          habilitado: false,
          texto: "El importe será debitado automáticamente de su cuenta.",
        },
      };
    },

    getIntegrationFieldMap: function () {
      return {
        transferencia: {
          enabled: "transferencia_habilitado",
          fields: {
            banco: "transferencia_banco",
            cbu: "transferencia_cbu",
            alias: "transferencia_alias",
            titular: "transferencia_titular",
            cuit_titular: "transferencia_cuit_titular",
          },
        },
        mercadopago: {
          enabled: "mercadopago_habilitado",
          fields: {
            tipo: "mercadopago_tipo",
            url: "mercadopago_url",
            mostrar_qr: "mercadopago_mostrar_qr",
          },
        },
        pagofacil: {
          enabled: "pagofacil_habilitado",
          fields: {
            codigo_entidad: "pagofacil_codigo_entidad",
            template_codigo: "pagofacil_template_codigo",
          },
        },
        rapipago: {
          enabled: "rapipago_habilitado",
          fields: {
            codigo_entidad: "rapipago_codigo_entidad",
            template_codigo: "rapipago_template_codigo",
          },
        },
        debito_automatico: {
          enabled: "debitoautomatico_habilitado",
          fields: {
            texto: "debitoautomatico_texto",
          },
        },
      };
    },

    applyIntegrationConfigToView: function (view, integraciones) {
      var defaults = this.getDefaultIntegracionesPago();
      var fieldMap = this.getIntegrationFieldMap();
      var controller = this;

      Ext.Object.each(fieldMap, function (key, cfg) {
        var data = Ext.apply({}, defaults[key]);
        if (integraciones && integraciones[key]) {
          Ext.apply(data, integraciones[key]);
        }

        var enabledField = view.down("#" + cfg.enabled);
        if (enabledField) {
          enabledField.setValue(!!data.habilitado);
        }

        Ext.Object.each(cfg.fields, function (prop, itemId) {
          var field = view.down("#" + itemId);
          if (!field) {
            return;
          }

          if (field.isXType && field.isXType("checkboxfield")) {
            field.setValue(!!data[prop]);
          } else {
            field.setValue(data[prop] !== undefined && data[prop] !== null ? data[prop] : "");
          }
        });

        controller.setIntegrationFieldsDisabled(view, key, !data.habilitado);
      });
    },

    buildIntegracionesPagoConfig: function (view) {
      var defaults = this.getDefaultIntegracionesPago();
      var fieldMap = this.getIntegrationFieldMap();
      var result = {};

      Ext.Object.each(fieldMap, function (key, cfg) {
        var data = Ext.apply({}, defaults[key]);
        var enabledField = view.down("#" + cfg.enabled);
        data.habilitado = enabledField ? !!enabledField.getValue() : false;

        Ext.Object.each(cfg.fields, function (prop, itemId) {
          var field = view.down("#" + itemId);
          if (!field) {
            return;
          }

          var value = field.getValue();
          if (field.isXType && field.isXType("checkboxfield")) {
            data[prop] = !!value;
          } else {
            data[prop] = value !== undefined && value !== null ? value : "";
          }
        });

        if (key === "mercadopago" && !data.tipo) {
          data.tipo = defaults[key].tipo;
        }

        if ((key === "pagofacil" || key === "rapipago") && !data.template_codigo) {
          data.template_codigo = defaults[key].template_codigo;
        }

        if (key === "debito_automatico" && !data.texto) {
          data.texto = defaults[key].texto;
        }

        result[key] = data;
      });

      return result;
    },

    setIntegrationFieldsDisabled: function (view, key, disabled) {
      var cfg = this.getIntegrationFieldMap()[key];
      if (!cfg) {
        return;
      }

      Ext.Object.each(cfg.fields, function (prop, itemId) {
        var field = view.down("#" + itemId);
        if (field) {
          field.setDisabled(disabled);
        }
      });
    },

    onIntegrationToggleChange: function (checkbox, checked) {
      var view = checkbox.up("moneyguardorganizacionformview");
      if (!view || !checkbox.integrationKey) {
        return;
      }

      this.setIntegrationFieldsDisabled(view, checkbox.integrationKey, !checked);
    },

    loadFacturaConfig: function (view, record) {
      var metadata = record.get("org_cmetadata");
      var factura = {};
      var obsField = view.down("#observaciones_template");
      var footerField = view.down("#footer_fijo");
      var qrCheckbox = view.down("#mostrar_qr_afip");
      var logoDisplay = view.down("#factura_logo_display");
      if (metadata) {
        try {
          var metadataObj = Ext.JSON.decode(metadata);
          if (metadataObj && metadataObj.factura) {
            factura = metadataObj.factura;
          }
        } catch (e) {
          factura = {};
        }
      }

      if (obsField) {
        obsField.setValue(factura.observaciones_template || "");
      }
      if (footerField) {
        footerField.setValue(factura.footer_fijo || "");
      }
      if (qrCheckbox) {
        qrCheckbox.setValue(factura.mostrar_qr_afip === true);
      }
      if (logoDisplay) {
        logoDisplay.setValue(factura.logo_url || "");
      }

      this.applyIntegrationConfigToView(view, factura.integraciones_pago || {});
    },

    saveFacturaConfig: function (view, record) {
      var existingMetadata = {};
      try {
        var rawMetadata = record.get("org_cmetadata");
        if (rawMetadata) {
          existingMetadata = Ext.JSON.decode(rawMetadata);
        }
      } catch (e) {
        existingMetadata = {};
      }

      var facturaMetadata = existingMetadata.factura || {};
      facturaMetadata.observaciones_template = view.down("#observaciones_template").getValue() || "";
      facturaMetadata.footer_fijo = view.down("#footer_fijo").getValue() || "";
      facturaMetadata.mostrar_qr_afip = !!view.down("#mostrar_qr_afip").getValue();
      facturaMetadata.integraciones_pago = this.buildIntegracionesPagoConfig(view);

      // Preserve logo_url if it was set
      var logoDisplay = view.down("#factura_logo_display");
      if (logoDisplay && logoDisplay.getValue()) {
        facturaMetadata.logo_url = logoDisplay.getValue();
      }

      existingMetadata.factura = facturaMetadata;
      record.set("org_cmetadata", Ext.encode(existingMetadata));
    },

    onInsertVariableClick: function (button) {
      var view = button.up('moneyguardorganizacionformview');
      var obsField = view.down('#observaciones_template');

      var insertVar = function (variable) {
        var textarea = obsField.inputEl.dom;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;
        var text = obsField.getValue() || '';
        var before = text.substring(0, start);
        var after = text.substring(end);
        obsField.setValue(before + variable + after);
        obsField.focus();
        var newPos = start + variable.length;
        textarea.selectionStart = textarea.selectionEnd = newPos;
      };

      var menu = Ext.create('Ext.menu.Menu', {
        items: [
          {
            text: getLocale('Emisor'),
            menu: [
              { text: 'Nombre — {{emisor_nombre}}', handler: function () { insertVar('{{emisor_nombre}}'); } },
              { text: 'CUIT — {{emisor_cuit}}', handler: function () { insertVar('{{emisor_cuit}}'); } },
              { text: 'Domicilio — {{emisor_domicilio}}', handler: function () { insertVar('{{emisor_domicilio}}'); } },
              { text: 'Localidad — {{emisor_localidad}}', handler: function () { insertVar('{{emisor_localidad}}'); } },
              { text: 'Provincia — {{emisor_provincia}}', handler: function () { insertVar('{{emisor_provincia}}'); } },
              { text: 'Código postal — {{emisor_cp}}', handler: function () { insertVar('{{emisor_cp}}'); } },
              { text: 'Teléfono — {{emisor_telefono}}', handler: function () { insertVar('{{emisor_telefono}}'); } },
              { text: 'Email — {{emisor_email}}', handler: function () { insertVar('{{emisor_email}}'); } },
              { text: 'Categoría IVA — {{emisor_iva}}', handler: function () { insertVar('{{emisor_iva}}'); } },
              { text: 'Símbolo moneda — {{emisor_simbolo}}', handler: function () { insertVar('{{emisor_simbolo}}'); } }
            ]
          },
          {
            text: getLocale('Cliente'),
            menu: [
              { text: 'Nombre — {{cliente_nombre}}', handler: function () { insertVar('{{cliente_nombre}}'); } },
              { text: 'CUIT — {{cliente_cuit}}', handler: function () { insertVar('{{cliente_cuit}}'); } },
              { text: 'Categoría IVA — {{cliente_iva}}', handler: function () { insertVar('{{cliente_iva}}'); } },
              { text: 'Domicilio — {{cliente_domicilio}}', handler: function () { insertVar('{{cliente_domicilio}}'); } },
              { text: 'Localidad — {{cliente_localidad}}', handler: function () { insertVar('{{cliente_localidad}}'); } },
              { text: 'Provincia — {{cliente_provincia}}', handler: function () { insertVar('{{cliente_provincia}}'); } },
              { text: 'Código postal — {{cliente_cp}}', handler: function () { insertVar('{{cliente_cp}}'); } },
              { text: 'Teléfono — {{cliente_telefono}}', handler: function () { insertVar('{{cliente_telefono}}'); } },
              { text: 'Contacto — {{cliente_contacto}}', handler: function () { insertVar('{{cliente_contacto}}'); } },
              { text: 'Servicio — {{cliente_servicio}}', handler: function () { insertVar('{{cliente_servicio}}'); } },
              { text: 'Observación — {{cliente_observacion}}', handler: function () { insertVar('{{cliente_observacion}}'); } }
            ]
          },
          {
            text: getLocale('Comprobante'),
            menu: [
              { text: 'Tipo — {{comprobante_tipo}}', handler: function () { insertVar('{{comprobante_tipo}}'); } },
              { text: 'Número — {{comprobante_numero}}', handler: function () { insertVar('{{comprobante_numero}}'); } },
              { text: 'Fecha — {{comprobante_fecha}}', handler: function () { insertVar('{{comprobante_fecha}}'); } },
              { text: 'Subtotal — {{comprobante_subtotal}}', handler: function () { insertVar('{{comprobante_subtotal}}'); } },
              { text: 'Total — {{comprobante_total}}', handler: function () { insertVar('{{comprobante_total}}'); } },
              { text: 'CAE — {{comprobante_cae}}', handler: function () { insertVar('{{comprobante_cae}}'); } },
              { text: 'Vto. CAE — {{comprobante_vto_cae}}', handler: function () { insertVar('{{comprobante_vto_cae}}'); } }
            ]
          },
          {
            text: getLocale('Calculadas'),
            menu: [
              { text: 'Período facturación — {{periodo_facturacion}}', handler: function () { insertVar('{{periodo_facturacion}}'); } },
              { text: 'Fecha actual — {{fecha_actual}}', handler: function () { insertVar('{{fecha_actual}}'); } },
              { text: 'Condición de pago — {{condicion_pago}}', handler: function () { insertVar('{{condicion_pago}}'); } },
              { text: 'Cantidad de ítems — {{cantidad_items}}', handler: function () { insertVar('{{cantidad_items}}'); } }
            ]
          }
        ]
      });
      menu.showBy(button);
    },

    showLocalFacturaPreview: function (view) {
      var obsTemplate = view.down("#observaciones_template").getValue() || "";
      var footerFijo = view.down("#footer_fijo").getValue() || "";

      var dummyVars = {
        emisor_nombre: "Mi Empresa S.A.",
        emisor_cuit: "30-12345678-9",
        emisor_domicilio: "Av. Corrientes 1234",
        emisor_localidad: "CABA",
        emisor_provincia: "Buenos Aires",
        emisor_cp: "1043",
        emisor_telefono: "011-4567-8900",
        emisor_email: "info@miempresa.com",
        emisor_iva: "Responsable Inscripto",
        emisor_simbolo: "$",
        cliente_nombre: "Cliente Ejemplo S.R.L.",
        cliente_cuit: "30-98765432-1",
        cliente_iva: "Responsable Inscripto",
        cliente_domicilio: "Calle Falsa 742",
        cliente_localidad: "Rosario",
        cliente_provincia: "Santa Fe",
        cliente_cp: "2000",
        cliente_telefono: "0341-456-7890",
        cliente_contacto: "Juan Pérez",
        cliente_servicio: "Monitoreo de alarmas",
        cliente_observacion: "Cliente preferencial",
        comprobante_tipo: "Factura A",
        comprobante_numero: "0001-00001234",
        comprobante_fecha: Ext.Date.format(new Date(), "d/m/Y"),
        comprobante_subtotal: "10.000,00",
        comprobante_total: "12.100,00",
        comprobante_cae: "71234567890123",
        comprobante_vto_cae: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 10), "d/m/Y"),
        periodo_facturacion: Ext.Date.format(new Date(), "F Y"),
        fecha_actual: Ext.Date.format(new Date(), "d/m/Y"),
        condicion_pago: "Contado",
        cantidad_items: "3",
      };

      var renderedObs = obsTemplate.replace(/\{\{(\w+)\}\}/g, function (match, key) {
        return dummyVars[key] !== undefined ? dummyVars[key] : "";
      });

      var obsHtml = Ext.String.htmlEncode(renderedObs).replace(/\n/g, "<br>");
      var footerHtml = Ext.String.htmlEncode(footerFijo).replace(/\n/g, "<br>");

      Ext.create("Ext.window.Window", {
        title: getLocale("Preview de Factura"),
        width: 550,
        height: 400,
        layout: "fit",
        modal: true,
        items: [{
          xtype: "panel",
          bodyPadding: 15,
          scrollable: true,
          html: '<div style="font-family: Arial, sans-serif;">' +
            '<h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">' + getLocale("Observaciones") + '</h3>' +
            '<p>' + (obsHtml || '<em style="color:#999;">' + getLocale("Sin observaciones configuradas") + '</em>') + '</p>' +
            '<h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 20px;">' + getLocale("Footer") + '</h3>' +
            '<p style="color: #666; font-size: 11px;">' + (footerHtml || '<em style="color:#999;">' + getLocale("Sin footer configurado") + '</em>') + '</p>' +
            '<p style="margin-top: 15px; color: #999; font-size: 10px; font-style: italic;">' +
            getLocale("Los valores mostrados son datos de ejemplo para previsualización.") + '</p>' +
            '</div>',
        }],
      }).show();
    },

    onPreviewFacturaClick: function (button) {
      var view = button.up("moneyguardorganizacionformview");
      var record = view.record;

      if (!record || !record.get("Id") || record.get("Id") === 0) {
        this.showLocalFacturaPreview(view);
        return;
      }

      this.saveFacturaConfig(view, record);

      var token = "";
      try {
        token = typeof getToken2 === "function" ? getToken2() : "";
      } catch (e) {
        token = "";
      }

      var url = "/handler/ComprobantePdfMG?preview=true&orgId=" + encodeURIComponent(record.get("Id"));
      url = Ext.String.urlAppend(url, "metadata=" + encodeURIComponent(record.get("org_cmetadata") || ""));
      if (token) {
        url = Ext.String.urlAppend(url, "oauth_token=" + encodeURIComponent(token));
      }

      Ext.create("Ext.window.Window", {
        title: getLocale("Preview de Factura"),
        width: 980,
        height: 720,
        layout: "fit",
        modal: true,
        items: [{
          xtype: "component",
          autoEl: {
            tag: "iframe",
            src: url,
            style: "border:0;width:100%;height:100%;background:white;",
          },
        }],
      }).show();
    },

    onFacturaLogoClick: function (button) {
      var view = button.up('moneyguardorganizacionformview');
      var record = view.record;
      var orgId = record.get('Id');

      if (record.phantom === true || !Ext.isNumeric(orgId) || Number(orgId) <= 0) {
        Ext.MessageBox.alert(getLocale('Atención'), getLocale('Debe guardar la organización primero.'));
        return;
      }

      var photo = 'invoice_logo_' + orgId + '.jpg';
      var logoDisplay = view.down('#factura_logo_display');
      var controller = this;

      var w = Ext.widget('window', {
        title: getLocale('Logo de Factura'),
        height: 300,
        width: 400,
        closeAction: 'destroy',
        border: false,
        record: record,
        tbar: [
          Ext.create('AdministratorSearch.view.UploadButton', {
            text: getLocale('Logo'),
            plugins: [{
              ptype: 'uploadwindow',
              title: getLocale('Subir Logo de Factura'),
              width: 350,
              height: 150
            }],
            uploader: {
              url: '/rest/upload/new?search=softguardMiscFile',
              uploadpath: '',
              multi_selection: false,
              autoStart: true,
              unique_names: false,
              maxFileSize: '50mb',
              path: 'Moneyguard',
              filters: {
                mime_types: [{ title: 'Archivos de imagen', extensions: 'jpg,png' }]
              },
              drop_element: 'InvoiceLogoImage',
              statusQueuedText: getLocale('Listo para subir'),
              statusUploadingText: getLocale('Subiendo') + ' ({0}%)',
              statusFailedText: '<span style="color: red">Error</span>',
              statusDoneText: '<span style="color: green">Completo</span>',
              statusInvalidSizeText: 'Archivo demasiado largo',
              statusInvalidExtensionText: 'Formato inválido'
            },
            listeners: {
              filesadded: function (uploader, files) {
                var file = files[0];
                file.name = photo;
                file.target_name = photo;
                return true;
              },
              beforeupload: function (uploader, file) {
                file.name = photo;
                file.target_name = photo;
                var url = '/rest/upload/new?search=softguardMiscFile';
                if (uploader.path) {
                  url = url + '&Path=' + uploader.path;
                }
                url += '&filename=' + photo;
                uploader.uploader.settings.url = url;
              },
              uploadcomplete: function (uploader, success, failed) {
                var file = success.pop();
                var logoPath = '/gallery/Moneyguard/' + file.name;
                w.down('image').setSrc(logoPath + '?_dc=' + Date.now());
                logoDisplay.setValue(logoPath);
              },
              scope: controller
            }
          })
        ],
        items: [{
          xtype: 'image',
          src: '/gallery/Moneyguard/' + photo + '?_dc=' + Date.now(),
          style: { objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' },
          id: 'InvoiceLogoImage',
          itemId: 'InvoiceLogoImage'
        }],
        autoShow: true,
        modal: true
      });
    },
  },
);
