//https://github.com/vkurko/calendar

function _pad(num) {
  let norm = Math.floor(Math.abs(num));
  return (norm < 10 ? "0" : "") + norm;
}

// Helper para formatear un registro de evento al formato del calendario
function _formatEventRecord(r) {
  return {
    start:
      r.get("StartDate").getFullYear() +
      "-" +
      _pad(r.get("StartDate").getMonth() + 1) +
      "-" +
      _pad(r.get("StartDate").getDate()) +
      " " +
      _pad(r.get("StartDate").getHours()) +
      ":" +
      _pad(r.get("StartDate").getMinutes()),
    end:
      r.get("EndDate").getFullYear() +
      "-" +
      _pad(r.get("EndDate").getMonth() + 1) +
      "-" +
      _pad(r.get("EndDate").getDate()) +
      " " +
      _pad(r.get("EndDate").getHours()) +
      ":" +
      _pad(r.get("EndDate").getMinutes()),
    title: r.get("Schedule") || r.get("Name"),
    id: r.get("Id"),
  };
}

Ext.define("SGWebCrm.controller.EventCalendarController", {
  _comboUsuariosDebounceTimer: null,
  // Guardar scheduleFilterEmail en el controlador para que persista entre recreaciones de la view
  _scheduleFilterEmail: null,
  extend: "Ext.app.Controller",
  stores: [],
  models: ["AdministratorSearchModel", "EventSearchModel"],
  views: ["EventCalendarView"],

  init: function (config) {
    // genero los eventos
    this.control({
      eventcalendarview: {
        afterrender: this.initview,
      },
      "eventcalendarview #comboUsuarios": {
        select: this.onComboUsuariosSelect,
        change: this.onComboUsuariosChange,
      },
      "eventcalendarview #btnTodosUsuarios": {
        click: this.onAllCalendarClick,
      },
      "eventcalendarview #btnMiUsuario": {
        click: this.onMiUsuarioClick,
      },
      "eventcalendarview #btnBuscar": {
        click: this.onBuscarClick,
      },
    });
  },

  /**
   * Limpia todos los eventos del calendario de forma segura.
   * Usa removeEventById para cada evento ya que setOption("events", []) puede no funcionar correctamente.
   * @param {Object} view - La vista del calendario
   */
  clearCalendarEvents: function(view) {
    if (!view || !view.eventCalendar) return;
    
    var existingEvents = view.eventCalendar.getEvents();
    console.log('[clearCalendarEvents] Eventos a eliminar:', existingEvents ? existingEvents.length : 0);
    if (existingEvents && existingEvents.length > 0) {
      // Crear copia del array porque removeEventById modifica el array original
      var eventsToRemove = existingEvents.slice();
      eventsToRemove.forEach(function(evt) {
        view.eventCalendar.removeEventById(evt.id);
      });
    }
    view.eventos = [];
    console.log('[clearCalendarEvents] Eventos después de limpiar:', view.eventCalendar.getEvents().length);
  },

  /**
   * Establece los eventos en el calendario destruyéndolo y recreándolo.
   * Esta es la forma más segura de garantizar que solo se muestren los eventos nuevos.
   * @param {Object} view - La vista del calendario
   * @param {Array} eventos - Array de eventos a mostrar
   */
  setCalendarEvents: function(view, eventos) {
    if (!view) return;
    
    var controller = Ext.app.Application.instance.getController("EventCalendarController");
    
    console.log('[setCalendarEvents] Recreando calendario con eventos:', eventos.length);
    
    // Marcar que estamos recreando para evitar que datesSet dispare otra carga
    view._isRecreating = true;
    
    // Guardar la fecha y vista actual antes de destruir
    var currentDate = null;
    var currentView = 'timeGridWeek';
    if (view.eventCalendar) {
      try {
        currentDate = view.eventCalendar.getOption('date');
        currentView = view.eventCalendar.getOption('view');
      } catch(e) {}
      
      // Liberar referencia
      view.eventCalendar = null;
    }
    
    // Destruir y recrear el contenedor DOM completamente
    var oldContainer = document.getElementById("ec");
    if (oldContainer && oldContainer.parentNode) {
      var parent = oldContainer.parentNode;
      var newContainer = document.createElement('div');
      newContainer.id = 'ec';
      newContainer.style.cssText = oldContainer.style.cssText;
      newContainer.className = oldContainer.className;
      parent.removeChild(oldContainer);
      parent.appendChild(newContainer);
    }
    
    var container = document.getElementById("ec");
    
    // Recrear el calendario con los nuevos eventos
    var ec = new EventCalendar(container, {
      view: currentView,
      date: currentDate || new Date(),
      events: eventos || [],
      buttonText: {
        close: getLocale("Cerrar"),
        dayGridMonth: "mes",
        listDay: "listar",
        listMonth: "list",
        listWeek: "list",
        listYear: "listar",
        resourceTimeGridDay: "resources",
        resourceTimeGridWeek: "resources",
        resourceTimelineDay: "timeline",
        resourceTimelineMonth: "timeline",
        resourceTimelineWeek: "timeline",
        timeGridDay: "día",
        timeGridWeek: "semana",
        today: "hoy",
      },
      durationEditable: false,
      slotDuration: "00:05:00",
      eventStartEditable: false,
      eventDurationEditable: false,
      editable: false,
      select: function (info) {
        controller.showAddWindow(info, view);
      },
      eventClick: function (info) {
        controller.showEditWindow(info, view);
      },
      headerToolbar: {
        start: getLocale("prev,next today"),
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay ",
      },
      scrollTime: "09:00:00",
      datesSet: controller.onDatesSet,
      views: {
        timeGridWeek: { pointer: true },
      },
      dayMaxEvents: true,
      nowIndicator: true,
      selectable: true,
    });
    
    view.eventCalendar = ec;
    view.eventos = eventos;
    
    // Quitar la bandera después de un pequeño delay para que datesSet se ignore
    setTimeout(function() {
      view._isRecreating = false;
    }, 100);
    
    console.log('[setCalendarEvents] Calendario recreado con', eventos.length, 'eventos');
  },

  /**
   * Carga eventos del usuario específico Y eventos sin Schedule asignado (para todos).
   * Hace dos llamadas al servidor y combina los resultados.
   * @param {Object} view - La vista del calendario
   * @param {String} scheduleEmail - Email del usuario a filtrar
   * @param {Function} callback - Callback opcional al finalizar
   */
  loadEventsWithEmptySchedule: function (view, scheduleEmail, callback) {
    var store = view.storeEventos;
    var me = this;

    // Obtener los filtros de fecha actuales
    var dateFilters = [];
    store.getFilters().each(function (filter) {
      var id = filter.getId();
      if (id === "datestart" || id === "dateend") {
        dateFilters.push({
          property: filter.getProperty(),
          value: filter.getValue(),
          id: id,
        });
      }
    });

    // Primera llamada: eventos del usuario específico
    var storeUsuario = Ext.create("Ext.data.Store", {
      model: me.getEventSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
    });

    var filtersUsuario = dateFilters.slice();
    filtersUsuario.push({
      property: "Schedule",
      value: scheduleEmail,
      id: "schedule",
    });
    storeUsuario.filter(filtersUsuario);

    // Segunda llamada: eventos sin Schedule (para todos)
    var storeVacio = Ext.create("Ext.data.Store", {
      model: me.getEventSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
    });

    var filtersVacio = dateFilters.slice();
    filtersVacio.push({
      property: "Schedule",
      value: "",
      id: "schedule",
    });
    storeVacio.filter(filtersVacio);

    var recordsUsuario = [];
    var recordsVacio = [];
    var loadedCount = 0;

    var combineResults = function () {
      loadedCount++;
      if (loadedCount < 2) return; // Esperar ambas respuestas

      // Verificar que el calendario esté inicializado
      if (!view.eventCalendar) return;

      // Combinar y eliminar duplicados por Id
      var eventoMap = {};
      var eventos = [];

      console.log('[combineResults] Eventos del usuario:', recordsUsuario.length);
      console.log('[combineResults] Eventos sin Schedule:', recordsVacio.length);

      // Primero agregar eventos del usuario
      recordsUsuario.forEach(function (r) {
        var id = r.get("Id");
        if (!eventoMap[id]) {
          eventoMap[id] = true;
          eventos.push(_formatEventRecord(r));
        }
      });

      // NO agregar eventos sin Schedule cuando se filtra por usuario específico
      // Solo mostrar los eventos del usuario filtrado
      // (Comentado: antes se agregaban eventos con Schedule vacío)
      /*
      recordsVacio.forEach(function (r) {
        var id = r.get("Id");
        if (!eventoMap[id]) {
          eventoMap[id] = true;
          eventos.push(_formatEventRecord(r));
        }
      });
      */

      console.log('[combineResults] Total eventos a mostrar:', eventos.length);
      me.setCalendarEvents(view, eventos);
      view.scheduleFilterEmail = scheduleEmail;
      // Guardar también en el controlador para que persista entre recreaciones de view
      me._scheduleFilterEmail = scheduleEmail;

      // Actualizar el filtro en el store principal para que showAddWindow lo detecte
      var scheduleFilter = store.getFilters().findBy(function (f) {
        return f.getId() === "schedule";
      });
      if (scheduleFilter) {
        store.removeFilter(scheduleFilter, true);
      }
      store.filter({
        property: "Schedule",
        value: scheduleEmail,
        id: "schedule",
      });

      if (callback) callback(eventos);
    };

    storeUsuario.load({
      callback: function (records, operation, success) {
        if (success) {
          recordsUsuario = records;
        }
        combineResults();
      },
    });

    storeVacio.load({
      callback: function (records, operation, success) {
        if (success) {
          recordsVacio = records;
        }
        combineResults();
      },
    });
  },

  onComboUsuariosChange: function (combo, newValue) {
    if (typeof newValue !== "string") return;

    var me = this;
    if (me._comboUsuariosDebounceTimer) {
      clearTimeout(me._comboUsuariosDebounceTimer);
    }
    me._comboUsuariosDebounceTimer = setTimeout(function () {
      var view = combo.up("eventcalendarview");
      if (!newValue) return;

      // Usar función helper que combina eventos del usuario + eventos sin Schedule
      me.loadEventsWithEmptySchedule(view, newValue);
    }, 350);
  },
  showAddWindow: function (info, view) {
    var start = info.start ? info.start : new Date();
    var end = info.end ? info.end : Ext.Date.add(start, Ext.Date.MINUTE, 30);

    // Determinar el Schedule basándose en el filtro activo
    // Primero intentar desde el controlador (persiste entre recreaciones de view)
    var schedule = this._scheduleFilterEmail || "";
    
    // Si no hay en el controlador, intentar desde la view pasada
    if (!schedule && view.scheduleFilterEmail) {
      schedule = view.scheduleFilterEmail;
    }
    
    // Si no hay scheduleFilterEmail en la view pasada, intentar desde la view obtenida por query
    if (!schedule) {
      var viewByQuery = Ext.ComponentQuery.query("eventcalendarview")[0];
      if (viewByQuery && viewByQuery.scheduleFilterEmail) {
        schedule = viewByQuery.scheduleFilterEmail;
      }
    }

    // Si aún no hay schedule, intentar obtenerlo del filtro del store
    if (!schedule && view.storeEventos) {
      var scheduleFilter = view.storeEventos
        .getFilters()
        .findBy(function (filter) {
          return filter.getId() === "schedule";
        });
      if (scheduleFilter) {
        schedule = scheduleFilter.getValue() || "";
      }
    }

    // IMPORTANTE: Si aún no hay schedule, usar el usuario actual
    // Esto asegura que el evento siempre tenga un dueño y no sea visible para todos
    if (!schedule && _UserData && _UserData.UserId) {
      schedule = _UserData.UserId;
    }


    var r = Ext.create("SGWebCrm.model.EventModel", {
      Id: 0,
      Name: "Nueva cita",
      StartDate: start,
      EndDate: end,
      AllDay: false,
      CalendarId:
        (view.eventCalendar && view.eventCalendar.currentCalendarId) || null,
      Schedule: schedule,
    });

    const parsed = {
      start:
        start.getFullYear() +
        "-" +
        _pad(start.getMonth() + 1) +
        "-" +
        _pad(start.getDate()) +
        " " +
        _pad(start.getHours()) +
        ":" +
        _pad(start.getMinutes()),
      end:
        end.getFullYear() +
        "-" +
        _pad(end.getMonth() + 1) +
        "-" +
        _pad(end.getDate()) +
        " " +
        _pad(end.getHours()) +
        ":" +
        _pad(end.getMinutes()),
      title: r.get("Schedule"),
      id: r.get("Id"),
    };

    const defaultEvents = view.eventos ?? [];
    const eventsParsed = [...defaultEvents, parsed];

    view.eventCalendar.setOption("events", eventsParsed);
    const handlerManager = view.eventCalendar;

    var win = Ext.create("Ext.Window", {
      closeAction: "destroy",
      iconCls: "icon-date",
      width: 700,
      height: 410,
      border: true,
      modal: true,
      layout: "fit",
      items: [
        Ext.widget("eventview", {
          title: "",
          objectId: 0,
          record: r,
          onDiscard: function () {
            // Resetting to default
            handlerManager.setOption("events", defaultEvents);
          },
          eventosDefault: defaultEvents,
          eventosFull: eventsParsed,
          eventCalendar: view.eventCalendar,
          startDate: info.start,
          endDate: info.end,
        }),
      ],
    });
    win.show();
  },
  showEditWindow: function (info, view) {
    var model = this.getEventSearchModelModel();
    model.load(info.event.id, {
      callback: function (record, success) {
        var win = Ext.create("Ext.Window", {
          //title : record.get('Name'),
          closeAction: "destroy",
          iconCls: "icon-date",
          width: 700,
          height: 410,
          border: true,
          modal: true,
          layout: "fit",
          items: [
            Ext.widget("eventview", {
              title: "",
              record: record,
              objectId: record.get("Id"),
              eventCalendar: view.eventCalendar,
            }),
          ],
        });
        win.show();
      },
    });
  },
  initview: function (view) {
    var controller = this;

    // Obtener información de seguridad del CRM
    var storeSecurity = SecurityModulesStore;
    var recordAdministrator = storeSecurity.findRecord(
      "KeyReference",
      "Administrator"
    );
    var recordCRM = storeSecurity.findRecord("KeyReference", "WebCRM");

    var tienePermisoVerTodos = false;

    // Obtener usuario actual desde _UserData (UserId contiene el email del usuario)
    var usuarioActual = _UserData ? _UserData.UserId : null;

    // Admin siempre tiene permiso
    if (recordAdministrator && recordAdministrator.get("Available") == true) {
      tienePermisoVerTodos = true;
    } else if (recordCRM && recordCRM.get("Available") == true) {
      var _security = recordCRM.get("_Security");
      if (
        _security &&
        _security.rights &&
        _security.rights.calendarioVerTodos == true
      ) {
        tienePermisoVerTodos = true;
      }
    }

    view.tienePermisoVerTodos = tienePermisoVerTodos;
    view.usuarioActual = usuarioActual;

    // Mostrar/ocultar controles según permiso
    if (tienePermisoVerTodos) {
      var btnFiltrar = view.down("#btnFiltrar");
      var btnBuscar = view.down("#btnBuscar");
      var btnTodosUsuarios = view.down("#btnTodosUsuarios");

      if (btnFiltrar) btnFiltrar.show();
      if (btnBuscar) btnBuscar.show();
      if (btnTodosUsuarios) btnTodosUsuarios.show();
    }

    // Crear store para combo de usuarios
    var store = Ext.create("Ext.data.Store", {
      model: "SGWebCrm.model.AdministratorSearchModel",
      pageSize: 50,
      remoteSort: true,
      remoteFilter: true,
      remoteGroup: false,
      filters: view.filters,
      sorters: [
        {
          property: "udw_usuario",
          direction: "ASC",
        },
      ],
    });
    view.down("#comboUsuarios").bindStore(store);
    store.load();
    view.filters = [];

    // Crear store para eventos
    var storeEventos = Ext.create("Ext.data.Store", {
      model: controller.getEventSearchModelModel(),
      remoteFilter: true,
      remoteSort: true,
    });
    view.storeEventos = storeEventos;

    // Si no tiene permiso de ver todos, guardar el email del usuario para filtrar
    // El filtro real se aplicará en onDatesSet usando doble llamada
    if (!tienePermisoVerTodos && usuarioActual) {
      view.scheduleFilterEmail = usuarioActual;
      storeEventos.filter({
        property: "Schedule",
        value: usuarioActual,
        id: "schedule",
      });
    }

    this.crearEventos(view);

    const ec = new EventCalendar(document.getElementById("ec"), {
      view: "timeGridWeek",
      buttonText: {
        close: getLocale("Cerrar"),
        dayGridMonth: "mes",
        listDay: "listar",
        listMonth: "list",
        listWeek: "list",
        listYear: "listar",
        resourceTimeGridDay: "resources",
        resourceTimeGridWeek: "resources",
        resourceTimelineDay: "timeline",
        resourceTimelineMonth: "timeline",
        resourceTimelineWeek: "timeline",
        timeGridDay: "día",
        timeGridWeek: "semana",
        today: "hoy",
      },
      durationEditable: false,
      slotDuration: "00:05:00",
      eventStartEditable: false,
      eventDurationEditable: false,
      editable: false,
      select: function (info) {
        controller.showAddWindow(info, view);
      },
      eventClick: function (info) {
        controller.showEditWindow(info, view);
      },
      /*eventMouseEnter: function(info){
                var tip = Ext.create('Ext.tip.ToolTip', {
                    target: info.jsEvent.currentTarget.innerHTML,
                    html: 'Press this button to clear the form'
                });              
            },*/
      headerToolbar: {
        start: getLocale("prev,next today"),
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay ",
      },
      /*resources: [
                {id: 1, title: 'Resource A'},
                {id: 2, title: 'Resource B'}
            ],*/
      scrollTime: "09:00:00",
      //events: createEvents(),
      datesSet: this.onDatesSet,

      views: {
        timeGridWeek: { pointer: true },
        /*resourceTimeGridWeek: {pointer: true},
                resourceTimelineWeek: {
                    pointer: true,
                    slotMinTime: '09:00',
                    slotMaxTime: '21:00',
                    slotWidth: 80,
                    resources: [
                        {id: 1, title: 'Resource A'},
                        {id: 2, title: 'Resource B'},
                        {id: 3, title: 'Resource C'},
                        {id: 4, title: 'Resource D'},
                        {id: 5, title: 'Resource E'},
                        {id: 6, title: 'Resource F'},
                        {id: 7, title: 'Resource G'},
                        {id: 8, title: 'Resource H'},
                        {id: 9, title: 'Resource I'},
                        {id: 10, title: 'Resource J'},
                        {id: 11, title: 'Resource K'},
                        {id: 12, title: 'Resource L'},
                        {id: 13, title: 'Resource M'},
                        {id: 14, title: 'Resource N'},
                        {id: 15, title: 'Resource O'}
                    ]
                }*/
      },
      dayMaxEvents: true,
      nowIndicator: true,
      selectable: true,
    });
    view.eventCalendar = ec;
  },
  crearEventos: function (view) {},

  onDatesSet: function (info) {
    var viewArr = Ext.ComponentQuery.query("eventcalendarview");
    var view = viewArr[0];
    
    // Si estamos recreando el calendario, ignorar este evento
    if (view._isRecreating) {
      console.log('[onDatesSet] Ignorando - calendario recreándose');
      return;
    }
    
    var store = view.storeEventos;
    
    // Obtener el controlador ExtJS real (this es el contexto de EventCalendar, no el controlador)
    var controller = Ext.app.Application.instance.getController("EventCalendarController");
    controller.store = store;

    // Preparar filtros de fecha
    var dateFilters = [];
    dateFilters.push({
      property: "StartDate:GTEDATESTRING",
      value:
        Ext.Date.format(info.start, "Y/m/d") +
        " " +
        Ext.Date.format(info.start, "H:i:s"),
      id: "datestart",
    });
    var endDate = Ext.Date.add(info.end, Ext.Date.DAY, 1);
    dateFilters.push({
      property: "EndDate:LTEDATESTRING",
      value:
        Ext.Date.format(endDate, "Y/m/d") +
        " " +
        Ext.Date.format(endDate, "H:i:s"),
      id: "dateend",
    });

    // Verificar si hay un filtro de Schedule activo
    var scheduleEmail = view.scheduleFilterEmail || null;
    var scheduleFilter = store.getFilters().findBy(function (filter) {
      return filter.getId() === "schedule";
    });
    if (scheduleFilter && !scheduleEmail) {
      scheduleEmail = scheduleFilter.getValue();
      view.scheduleFilterEmail = scheduleEmail;
    }

    // Aplicar filtros de fecha al store
    store.clearFilter();
    store.filter(dateFilters);

    // Si hay filtro de Schedule, usar doble llamada para incluir eventos sin Schedule
    if (scheduleEmail) {
      // Agregar el filtro de Schedule al store principal
      store.filter({
        property: "Schedule",
        value: scheduleEmail,
        id: "schedule",
      });

      // Obtener controlador real (this puede no ser el controlador dentro de EventCalendar)
      var calendarController = Ext.ComponentQuery.query("eventcalendarview")[0];
      if (calendarController && calendarController.up) {
        var ctrl =
          Ext.app.Application.instance.getController(
            "EventCalendarController"
          ) || controller;

        // Usar la función helper de doble llamada
        if (ctrl.loadEventsWithEmptySchedule) {
          ctrl.loadEventsWithEmptySchedule(view, scheduleEmail);
          return;
        }
      }
    }

    // Sin filtro de Schedule: cargar todos los eventos
    store.load({
      callback: function (records, operation, success) {
        // Verificar que el calendario esté inicializado
        if (!view.eventCalendar) return;
        
        if (success && records.length > 0) {
          var eventos = [];
          records.forEach(function (r) {
            eventos.push(_formatEventRecord(r));
          });
          controller.setCalendarEvents(view, eventos);
        } else if (success) {
          controller.clearCalendarEvents(view);
        }
      },
    });
  },
  onComboUsuariosSelect: function (combo, record) {
    var view = combo.up("eventcalendarview");
    var scheduleEmail = record.get("udw_usuario");

    // Usar función helper que combina eventos del usuario + eventos sin Schedule
    this.loadEventsWithEmptySchedule(view, scheduleEmail);
  },

  onAllCalendarClick: function (btn) {
    var view = btn.up("eventcalendarview");
    var store = view.storeEventos;
    var me = this;

    // Limpiar el filtro de Schedule guardado (view y controlador)
    view.scheduleFilterEmail = null;
    this._scheduleFilterEmail = null;

    // Solo remover el filtro de schedule, mantener los filtros de fecha
    var scheduleFilter = store.getFilters().findBy(function (filter) {
      return filter.getId() === "schedule";
    });
    if (scheduleFilter) {
      store.removeFilter(scheduleFilter);
    }

    store.load({
      callback: function (records, operation, success) {
        if (success) {
          var eventos = [];
          records.forEach(function (r) {
            eventos.push(_formatEventRecord(r));
          });
          me.setCalendarEvents(view, eventos);
        }
      },
    });

    var comboUsuarios = view.down("#comboUsuarios");
    if (comboUsuarios) comboUsuarios.setValue();
  },

  onMiUsuarioClick: function (btn) {
    var view = btn.up("eventcalendarview");
    var usuarioActual = view.usuarioActual;

    // Si no tenemos usuarioActual, intentar obtenerlo de nuevo de _UserData.UserId
    if (!usuarioActual && _UserData) {
      usuarioActual = _UserData.UserId;
      view.usuarioActual = usuarioActual;
    }

    if (!usuarioActual) {
      Ext.Msg.alert("Error", "No se pudo determinar el usuario actual");
      return;
    }

    // Usar función helper que combina eventos del usuario + eventos sin Schedule
    this.loadEventsWithEmptySchedule(view, usuarioActual);

    // Limpiar combo de usuarios si existe
    var combo = view.down("#comboUsuarios");
    if (combo) {
      combo.setValue(null);
    }
  },

  onBuscarClick: function (btn) {
    var view = btn.up("eventcalendarview");
    var combo = view.down("#comboUsuarios");
    var record = combo.getSelection();

    if (record) {
      this.onComboUsuariosSelect(combo, record);
    } else {
      Ext.Msg.alert("Aviso", "Seleccione un usuario para buscar");
    }
  },
});
