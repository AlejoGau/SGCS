Ext.define('Common.controller.EventController', {
  extend: 'Ext.app.Controller',
  stores: ['Common.store.EventModuleStore'],
  models: ['EventModel', 'OrganizationSearchModel', 'RelationModel'],
  views: ['EventView'],

  // Cerrojos simples y mapa de franjas abiertas
  editingLock: false,
  savingLock: false,
  noClear: false,
  openSlots: {},

  init: function (config) {
    this.control({
      'eventview': {
        beforerender: this.initview,
        close: this.releaseOnClose,
        destroy: this.releaseOnClose
      },
      'eventformview button[action=save]': { click: this.onSaveClick },
      'eventformview button[action=cancel]': { click: this.onCancelClick },
      'eventformview': {
        destroy: this.releaseOnClose,
      }
    });
  },

  // --- Utilidades de estado ---
  releaseLocks: function () {
    this.editingLock = false;
    this.savingLock = false;
  },

  releaseOnClose: function (cmp) {
    try {
      var view = cmp && cmp.up ? (cmp.up('eventview') || cmp) : cmp;
      if (!this.noClear) {
        view.eventCalendar.removeEventById(0);
      }

      if (view && view._slotKey && this.openSlots[view._slotKey]) {
        delete this.openSlots[view._slotKey];
        view._slotKey = null;
      }
    } catch (e) { }
    this.releaseLocks();
  },

  safeCloseView: function (view) {
    try {
      if (!view) { return; }
      if (view.hide) { view.hide(); }
      if (view.close) { view.close(); }
      if (!view.destroyed && view.destroy) { view.destroy(); }

      setTimeout(() => {
        // Selecciona todas las ventanas abiertas
        const windows = document.querySelectorAll(
          ".x-window.x-layer.x-window-default.x-closable.x-window-closable.x-window-default-closable.x-border-box.x-resizable.x-window-resizable.x-window-default-resizable"
        );

        // Si hay al menos una ventana
        if (windows.length > 0) {
          // Tomar la última (la más recientemente agregada al DOM)
          const lastWindow = windows[windows.length - 1];

          if (!lastWindow) {
            return;
          }

          // Buscar dentro de esa ventana el botón de close
          const closeBtn = lastWindow.querySelector(
            ".x-tool.x-box-item.x-tool-default.x-tool-after-title"
          );

          // Si existe el botón, disparar el click
          if (closeBtn) {
            closeBtn.click();
          } else {
            console.warn("No se encontró el botón de cerrar en la última ventana");
          }
        }
      }, 100);
    } catch (e) { }
  },

  // Clave única por franja y calendario
  buildSlotKey: function (view) {
    try {
      var s = view.startDate ? new Date(view.startDate) : null;
      if (!s || isNaN(s.getTime())) { return null; }
      var e = view.endDate ? new Date(view.endDate) : null;
      if (!e || isNaN(e.getTime())) { e = Ext.Date.add(s, Ext.Date.MINUTE, 30); }
      var calId = (view.eventCalendar && view.eventCalendar.currentCalendarId) || 'default';
      return [s.getTime(), e.getTime(), calId].join('_');
    } catch (err) { return null; }
  },

  // --- Ciclo de vida ---
  initview: function (view) {
    this.noClear = false;

    // Recuperación defensiva: si no hay editor visible pero quedó el flag
    if (this.editingLock && !(view.down && view.down('#mainEventTab'))) {
      this.editingLock = false;
    }

    // Si ya hay un editor abierto en cualquier lado, enfocar y abortar
    var existingTab = Ext.ComponentQuery.query('eventformview#mainEventTab')[0];
    if (existingTab) {
      try { existingTab.up('tabpanel').setActiveTab(existingTab); } catch (e) { }
      Ext.Msg.alert('Informacion', 'Ya hay un evento en edición.');
      this.safeCloseView(view);
      return;
    }

    // Evitar duplicar la MISMA franja
    var key = this.buildSlotKey(view);
    if (key && this.openSlots[key]) {
      Ext.Msg.alert('Informacion', 'Ya estás editando ese horario.');
      this.safeCloseView(view);
      return;
    }

    // Evitar abrir múltiples ediciones simultáneas
    if (this.editingLock) {
      Ext.Msg.alert('Informacion', 'Ya hay un evento en edición.');
      this.safeCloseView(view);
      return;
    }

    // Marcar estado y franja
    this.editingLock = true;
    view._slotKey = key;
    if (key) { this.openSlots[key] = true; }

    // Cargar/crear registro
    var objectId = view.objectId;
    var record = view.record;
    this.loadRecord(objectId, view, record);
  },

  // Carga o crea el registro SIN guardar automáticamente
  loadRecord: function (objectId, view, record) {
    var Model = this.getEventModelModel();

    // Nuevo registro
    if (objectId === 0 && record) {
      this.setRecord(record, view);
    } else {
      Model.load(objectId, {
        scope: this,
        callback: function (record, operation) {
          if (operation.success) {
            this.setRecord(record, view);
          } else {
            this.releaseOnClose(view);
          }
        }
      });
    }
  },

  // Enlaza el record a la pestaña/form y prepara el módulo
  setRecord: function (record, view) {
    var myPanel = view.down('tabpanel');
    var targetTab = myPanel;
    myPanel.record = record;

    var title = 'Datos principales';
    var viewport = view.up('viewport');

    var mytab = myPanel.down('#mainEventTab');
    if (!mytab) {
      var newTab = Ext.widget('eventformview', {
        itemId: 'mainEventTab',
        record,
        title: title,
        targetTab: myPanel,
        closable: false,
        parentGrid: view.parentGrid,
        eventCalendar: view.eventCalendar
      });

      myPanel.add(newTab);
      myPanel.setActiveTab(newTab);

      // EventFormView extiende Ext.form.Panel, así que es el form directamente
      // No buscar form anidado con down('form')
      if (newTab && record) {
        newTab.loadRecord(record);
      }
    } else {
      // EventFormView extiende Ext.form.Panel, entonces mytab ES el form panel directamente
      myPanel.setActiveTab(mytab);
      if (mytab && record) {
        mytab.loadRecord(record);
      }
    }

    // Configuración del módulo lateral
    var moduleObject = view.down('moduletreeview');
    if (moduleObject) {
      try {
        var tv = moduleObject.down ? moduleObject.down('treeview') : null;
        if (tv) {
          tv.record = record;
          tv.targetTab = myPanel;
        }
        moduleObject.record = record;
        moduleObject.targetTab = myPanel;

        if (window._UserData && _UserData.Company && _UserData.Company !== '') {
          var filters = [{ property: 'o.Id', value: _UserData.Company }];
          var store = Ext.create('Ext.data.Store', {
            model: this.getOrganizationSearchModelModel(),
            pageSize: 50,
            filters: filters,
            remoteSort: true,
            remoteFilter: true
          });

          var organizacionSecundaria = {};
          if (viewport && viewport.section) {
            organizacionSecundaria = {
              record: viewport.section,
              titleTab: viewport.section.get('LegalName'),
              multiSelect: true
            };
          }

          store.load({
            scope: this,
            callback: function (records) {
              try {
                var node = moduleObject.getRootNode && moduleObject.getRootNode().findChild('view', 'persongridview');
                if (node) {
                  node.viewConfig = {
                    helperConfig: {
                      xtype: 'contextpersonhelperview',
                      mismaOrganizacion: {
                        record: records && records[0],
                        titleTab: (records && records[0]) ? records[0].get('LegalName') : '',
                        multiSelect: true
                      },
                      organizacionSecundaria: organizacionSecundaria,
                      mostrarTodo: { mostrar: true, multiSelect: true }
                    },
                    hideColumns: ['Organizacion'],
                    hideControls: ['#newPerson', '#perfil', '#filtros', '#search', '#todos', '#smartmail']
                  };
                }
              } catch (e) { }
            }
          });
        } else {
          var node2 = moduleObject.getRootNode && moduleObject.getRootNode().findChild('view', 'persongridview');
          if (node2) {
            node2.viewConfig = {
              helperConfig: {
                xtype: 'contextpersonhelperview',
                organizacionSecundaria: {
                  record: view.organizationRecord,
                  titleTab: view.organizationRecord ? view.organizationRecord.get('LegalName') : '',
                  multiSelect: true
                },
                mostrarTodo: { mostrar: true, multiSelect: true }
              },
              hideColumns: ['Organizacion'],
              hideControls: ['#newPerson', '#perfil', '#filtros', '#search', '#todos', '#smartmail']
            };
          }
        }
      } catch (e) { }
    }
  },

  onSaveClick: function (btn) {
    var formPanel = btn.up('form');
    if (!formPanel) { return; }

    if (this.savingLock) { return; }
    this.savingLock = true;
    btn.setDisabled(true);

    var form = formPanel.getForm();
    if (!form.isValid()) {
      this.savingLock = false;
      btn.setDisabled(false);
      return;
    }

    var rec = formPanel.getRecord();

    // Preservar las propiedades custom antes del save
    var needsRelation = rec._needsRelation;
    var parentRecord = rec._parentRecord;

    // Validación reforzada de tipo de evento
    var tipo = rec.get('TypeId') || rec.get('Type') || rec.get('tipo') || rec.get('type');
    if (!tipo) {
      this.savingLock = false;
      btn.setDisabled(false);
      Ext.Msg.alert('Falta información', 'Seleccioná el tipo de evento.');
      return;
    }

    // Validación y asignación de calendario
    var calendarId = rec.get('CalendarId');
    if (!calendarId) {
      var v = formPanel.up('eventview');
      var calCmp = (v && v.eventCalendar) || formPanel.eventCalendar;
      var calId = calCmp && calCmp.currentCalendarId;
      if (calId) {
        calendarId = calId;
        rec.set('CalendarId', calendarId);
      }
    }

    var fechahoradesde = new Date(
      Ext.Date.format(new Date(formPanel.down("#startdate").getValue()), "Y-m-d") +
      " " +
      Ext.Date.format(new Date(formPanel.down("#starttime").getValue()), "H:i:s")
    );
    var fechahorahasta = new Date(
      Ext.Date.format(new Date(formPanel.down("#enddate").getValue()), "Y-m-d") +
      " " +
      Ext.Date.format(new Date(formPanel.down("#endtime").getValue()), "H:i:s")
    );

    // Preservar Schedule antes de updateRecord
    // El campo Schedule se usa para filtrar eventos por usuario
    var scheduleValue = rec.get('Schedule');
    
    // También obtener del campo oculto del formulario si existe
    var scheduleField = formPanel.down('[name=Schedule]');
    var scheduleFormValue = scheduleField ? scheduleField.getValue() : null;
    
    console.log('[EventController] Schedule antes de updateRecord:', {
      scheduleValue: scheduleValue,
      scheduleFormValue: scheduleFormValue,
      scheduleFieldExists: !!scheduleField
    });

    form.updateRecord(rec);

    // Restaurar Schedule después de updateRecord
    // Priorizar: valor del formulario > valor original del record > usuario actual
    if (scheduleFormValue) {
      rec.set('Schedule', scheduleFormValue);
    } else if (scheduleValue) {
      rec.set('Schedule', scheduleValue);
    } else if (window._UserData && _UserData.UserId) {
      // Fallback: si no hay Schedule, asignar el usuario actual
      // para que el evento no sea visible para todos
      rec.set('Schedule', _UserData.UserId);
    }
    
    console.log('[EventController] Schedule después de restaurar:', rec.get('Schedule'));

    formPanel.setLoading(true);
    var me = this;

    if (fechahoradesde < fechahorahasta) {
      rec.set("StartDate", fechahoradesde);
      rec.set("EndDate", fechahorahasta);
    } else {
      Ext.Msg.alert('Informacion', 'El fin desde ser posterior a la comienzo.');
      return false;
    }

    rec.save({
      scope: this,
      success: function (savedRecord, operation) {
        // Si el guardado fue exitoso Y necesita crear relación
        if (needsRelation && parentRecord) {
          console.log('Entrando a crear relación...');
          var relationModel = me.getRelationModelModel();
          var parentRec = parentRecord;
          var parentTypeName = parentRec.get('ObjectTypeName');
          console.log('parentTypeName:', parentTypeName);

          var relation;
          if (parentTypeName === 'Person' || parentTypeName === 'UsersDesktopWeb') {
            console.log('Creando relación tipo Person...');
            relation = Ext.create(relationModel, {
              Id: 0,
              ObjectTypeId: savedRecord.get('ObjectTypeId'),
              RelationObjectTypeId: parentRec.get('ObjectTypeId'),
              ObjectId: savedRecord.get('Id'),
              RelationObjectId: parentRec.get('Id')
            });
            console.log('Relación Person creada:', relation.data);
          } else if (parentTypeName === 'Organization') {
            console.log('Creando relación tipo Organization...');
            relation = Ext.create(relationModel, {
              Id: 0,
              ObjectTypeId: parentRec.get('ObjectTypeId'),
              RelationObjectTypeId: savedRecord.get('ObjectTypeId'),
              ObjectId: parentRec.get('Id'),
              RelationObjectId: savedRecord.get('Id')
            });
            console.log('Relación Organization creada:', relation.data);
          }

          if (relation) {
            console.log('Guardando relación...');
            relation.save({
              success: function(rec, op) {
                console.log('Relación guardada exitosamente:', rec.data);
              },
              failure: function(rec, op) {
                console.error('Error al guardar relación:', op);
              }
            });
          } else {
            console.warn('No se creó objeto de relación');
          }
        } else {
          console.log('No necesita relación o no hay parentRecord');
        }

        formPanel.setLoading(false);

        // Fix DK-1240: Close window FIRST before anything else to prevent blank window
        try {
          var evView = formPanel.up('eventview');
          var win = evView ? evView.up('window') : null;
          if (win && win.close) {
            win.close();
          }
        } catch (e) {
          console.warn("Error al cerrar ventana:", e);
        }

        // Show success message
        Ext.Msg.alert('Informacion', 'Guardado correctamente');

        try {
          var view = formPanel.up('eventview');
          var calCmp = (view && view.eventCalendar) || formPanel.eventCalendar;
          if (calCmp) {
            me.noClear = true;
          }
        } catch (e) { }

        me.releaseLocks();

        // Refresh calendar - usar el método correcto del controlador
        try {
          var view = formPanel.up('eventview');
          var calendarView = Ext.ComponentQuery.query('eventcalendarview')[0];
          
          if (calendarView) {
            var calendarCtrl = Ext.app.Application.instance.getController('EventCalendarController');
            if (calendarCtrl && calendarCtrl.loadEventsWithEmptySchedule) {
              // Usar el filtro actual del calendario
              var scheduleEmail = calendarView.scheduleFilterEmail || 
                                  calendarCtrl._scheduleFilterEmail || 
                                  (_UserData && _UserData.UserId) || '';
              calendarCtrl.loadEventsWithEmptySchedule(calendarView, scheduleEmail);
            } else {
              // Fallback: recargar el store de eventos
              if (calendarView.storeEventos) {
                calendarView.storeEventos.load();
              }
            }
          }
        } catch (e) {
          console.warn("Error al refrescar calendario:", e);
        }

      },
      failure: function () {
        formPanel.setLoading(false);
        Ext.Msg.alert('Error', 'No se pudo guardar el evento');
        me.releaseLocks();
        btn.setDisabled(false);
      }
    });
  },

  onCancelClick: function (btn) {
    var tab = btn.up('eventformview');
    var tp = tab ? tab.up('tabpanel') : null;
    if (tp) { tp.remove(tab, true); }

    var evView = btn.up('eventview');
    if (evView && evView.close) { try { evView.close(); } catch (e) { } }

    // Liberar franja
    try {
      if (evView && evView._slotKey && this.openSlots[evView._slotKey]) {
        delete this.openSlots[evView._slotKey];
        evView._slotKey = null;
      }
    } catch (e) { }

    this.releaseLocks();
  }
});