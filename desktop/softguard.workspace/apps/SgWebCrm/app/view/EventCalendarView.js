Ext.define('SGWebCrm.view.EventCalendarView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventcalendarview',
    //calendarStore: Ext.StoreManager.lookup('Common.store.EventTypeStore'),
    border: false,
    activeItem: 3, // month view
    autoScroll: 'true',
    html: '<div id="ec" class="col"></div>',
    tbar: [
        {
            text: 'Filtrar',
            iconCls: 'icon-filter',
            itemId: 'btnFiltrar',
            hidden: true,
            menu: {
                xtype: 'menu',
                width: 280,
                items: [{
                    xtype: 'panel',
                    bodyPadding: 5,
                    items: [{
                        xtype: 'combo',
                        fieldLabel: getLocale('Usuario'),
                        itemId: 'comboUsuarios',
                        queryMode: 'local',
                        displayField: 'Name',
                        labelWidth: 55,
                        width: 250,
                        valueField: 'Id'
                    }]
                }]
            }
        },
        {
            text: getLocale('Buscar'),
            iconCls: 'icon-find',
            itemId: 'btnBuscar',
            hidden: true
        },
        '-',
        {
            text: getLocale('Mi usuario'),
            iconCls: 'icon-user',
            itemId: 'btnMiUsuario'
        },
        {
            text: getLocale('Todos los usuarios'),
            iconCls: 'icon-group',
            itemId: 'btnTodosUsuarios',
            hidden: true
        }
    ],
    /*monthViewCfg: {
        showHeader: true,
        showWeekLinks: true,
        showWeekNumbers: true,
        showNavBar: true,
        todayText: getLocale('Hoy'),
        enableDD: false,
        onMoreClick: function(date){
            var win = Ext.widget('window',{
                title: Ext.Date.format(date, 'd/m/Y'),
                layout: 'fit',
                width: 600,
                height: 500,
                items: {
                    xtype: 'tabpanel',
                    title: 'Eventos',
                    header: false,
                    items: [
                        {
                            header: false,
                            hideToolbar: true,
                            xtype: 'eventgridview',
                            filters: [{ 
                                property: 'StartDate:GTE',
                                value: date,
                                id: 'dateStart'
                            },{ 
                                property: 'EndDate:LTE',
                                value: Ext.Date.add(date, Ext.Date.DAY, 1),
                                id: 'dateEnd'
                            }]
                        }
                    ]
                }
            }).show();
            
            win.down('eventgridview').targetTab = win.down('tabpanel');
        }
    },*/
    
    dayText: getLocale('Día'),
    weekText: getLocale('Semana'),
    monthText: getLocale('Mes'),
    todayText: getLocale('Hoy'),
    
    listeners: {
        'eventclick': {
            fn: function(vw, rec, el){
                var view = vw.up('eventcalendarview');
                view.showEditWindow(rec);
            }
        },
        'eventover': function(vw, rec, el){
            //console.log('Entered evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
        },
        'eventout': function(vw, rec, el){
            //console.log('Leaving evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
        },
        'eventadd': {
            fn: function(cp, rec){
                notify('Se agregó el evento');
            },
            scope: this
        },
        'eventupdate': {
            fn: function(cp, rec){
                notify('Se actualizó el evento');
            },
            scope: this
        },
        /*'eventcancel': {
            fn: function(cp, rec){
                // edit canceled
            },
            scope: this
        },*/
        'viewchange': {
            fn: function(p, vw, dateInfo){
                if(dateInfo){
                    // will be null when switching to the event edit form so ignore
                    //Ext.getCmp('app-nav-picker').setValue(dateInfo.activeDate);
                    //this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                    p.setTitle(getLocale('Agenda: ')+Ext.Date.monthNames[dateInfo.activeDate.getMonth()]);
                    //console.log(dateInfo);
                }
            },
            scope: this
        },
        'dayclick': {
            fn: function(vw, dt, ad, el){
                // no permito crear eventos desde la agenda
                /*
                var view = vw.up('eventcalendarview');
                var store = view.eventStore;
                var now = new Date();
                var StartDate = new Date(dt.setHours(now.getHours()));
                var record = store.add({
                    StartDate: StartDate,
                    EndDate: Ext.Date.add(StartDate, Ext.Date.HOUR, 1),
                    Name: getLocale('Nuevo evento'),
                    EventType: 1
                })[0];
                record.setProxy(view.eventModel.getProxy());
                //record.save();
                view.showEditWindow(record);
                */
            },
            scope: this
        },
        'rangeselect': {
            fn: function(win, dates, onComplete){
                // creo un evento entre las fechas
                this.showEditWindow(record);
            },
            scope: this
        },
        'eventmove': {
            fn: function(vw, rec){
                var mappings = Ext.calendar.data.EventMappings,
                    time = rec.data[mappings.IsAllDay.name] ? '' : ' \\a\\t g:i a';
                
                rec.save();
            },
            scope: this
        },
        'eventresize': {
            fn: function(vw, rec){
                rec.save();
                notify('El evento fue actualizado');
            },
            scope: this
        },
        'eventdelete': {
            fn: function(win, rec){
                rec.destroy();
                notify('El evento fue eliminado');
            },
            scope: this
        },
        'initdrag': {
            fn: function(vw){
                // no permite hacer drag para crear eventos
                return false;
            },
            scope: this
        }
    },
    
    
    showEditWindow: function(record){

        var win = Ext.create('Ext.Window', {
    		title : record.get('Name'),
			closeAction : 'destroy',
            iconCls: 'icon-date',
			width : 700,
			height : 410,
			border : true,
            modal: true,
            layout: 'fit',
			items : [
                /*Ext.widget('eventview', {
                    title: '',
                    record: record,
                    objectId : record.get('Id')
        		})*/
            ]
		});
		win.show();
    },
    
    
    initComponent: function () {
        /*this.callParent();

        return;
        var record = this.record;
        var filters = [];
        this.eventSearchModel = Ext.data.schema.Schema.instances.default.getEntity('SGWebCrm.model.EventSearchModel'); //Ext.ModelManager.getModel('SGWebCrm.model.EventSearchModel');
        this.eventModel = Ext.data.schema.Schema.instances.default.getEntity('SGWebCrm.model.EventModel');

        if (record){
            var filters = [
                {
                    property: record.get('ObjectTypeName')+':RelationParent',
                    value: record.get('Id'),
                    id: 'parentFilter'
                }
            ]
        };
        
    	var store = Ext.create('Ext.data.Store', {
            model : this.eventSearchModel,
            remoteFilter: true,
            remoteSort: true,
            filters: filters,
        	autoload: false,
            listeners: {
                beforeload: function(store, operation){
                    if (operation.params){
                        var StartDate = Ext.Date.parse(operation.params.start, "m-d-Y");
                        var EndDate = Ext.Date.parse(operation.params.end, "m-d-Y");
                        var remove = [];
                        var dt = new Date();
                        
                        // elimino los filtros de datestart y dateend solamente.
                        for (i = 0, ln = operation.filters.length; i < ln; i++) {
                            if (operation.filters[i].id == 'datestart' || operation.filters[i].id == 'dateend') {
                                remove.push(operation.filters[i]);
                            }
                        }
                        
                        for (i = 0, ln = remove.length; i < ln; i++) {
                                Ext.Array.remove(operation.filters,remove[i]);
                        }
                        

                        if (StartDate){
                            operation.filters.push({
                                property: 'StartDate:GTE',
                                value: new Date(StartDate),
                                id: 'datestart'
                            });
                        }
                        
                        if (EndDate){
                            operation.filters.push({
                                property: 'EndDate:LTE',
                                value: Ext.Date.add(new Date(EndDate),Ext.Date.DAY,1),
                                id: 'dateend'
                            });
                        }
                    }
                    
                    return true
                }
            }
        });
        this.eventStore = store;*/
        
        this.callParent(arguments);  
        
    }
});
