//MIGRADO2024
Ext.define('Common.controller.PoiGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'PoiFileSearchModel', 'PoiByDealerSearchModel', 'GeocercaModel', 'GeocercaMapModel', 'GeocercaSearchModel', 'PoiModel', 'PoiSearchModel', 'FileSearchModel', 'TGFlotasByUserModel' ],
    views : [ 'PoiGridView' ],
    init : function(config) {
		// genero los eventos
		this.control({
			'poigridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemDblClick,
                expand: this.loadData,
                selectionchange : this.onSelectionChange
			},
            'poigridview button[action=search]': {
                click: this.onSearchClick
            },
            'poigridview button[action=searchall]': {
                click: this.onSearchAllClick
            },
            'poigridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'poigridview button[action=add]': {
                click: this.onAddClick
            },
          /*  'poigridview button[action=save]': {
                click: this.onSaveClick
            },*/
            'poigridview button[action=import]': {
                click: this.onImportClick
            },
            'poigridview button[action=showall]': {
                click: this.onShowalltClick
            }
		});
	}, // cierro init
	initView : function(view) {
        var controller = this;
        Ext.Ajax.request({
              url: '/Rest/t_parametros/',
              params: { filter:'[{"property":"par_ccodigo", "value":"NOMBREPAIS"}]'},
              method: 'GET',
              scope: this,
              success: function(response){
                view.pais = Ext.JSON.decode(response.responseText).rows[0].par_cvalor;
              }
        });
        
        Ext.Ajax.request({
          url: '/rest/security/UserData',
          success: function(resp,operation) {
              if(resp.responseText)  {                 
                    view.userdata = Ext.JSON.decode(resp.responseText);
                    
                    if (!view.collapsed){
                        controller.loadData(view);
                    }
              }
          }
        });
        
        if (!view.up('viewport')){
            view.removeDocked(view.down('toolbar'),true);
        }
        
        
        if(view.hideActions) {
            view.down('#import').hide()
            view.down('#delete').hide()
            view.down('#add').hide()
           // view.down('#save').hide()
        }
        
	},
    
    loadData: function (view) {
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var organizationId = view.userdata.Company;
        
        var filters= [{
            property: 'Organization',
            value: organizationId
        }];
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getPoiSearchModelModel(),
            remoteFilter: true,
            filters: filters
        });
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        store.load();
    },
    
    onShowalltClick: function (button){
        var view= button.up('flotagpsview');
        var poigridview = button.up('poigridview');
        var controller = this;
        if (poigridview.gmap){
            gmappanel6 = poigridview.gmap;
        } else {
            gmappanel6 = view.down('gmappanel6');
        } 
        var dateNow = new Date();
        /* cargo los poi */
        var url = '/handler/PoiGeoJson';
            url += '?token='+Ext.util.Cookies.get('OAuth_Token');
            url += "&_dc="+dateNow.getTime();
        
        if (button.pressed){
            if (!gmappanel6.poi){
                gmappanel6.poi = new google.maps.Data();
            }
            
            gmappanel6.poi.loadGeoJson(url, function(){console.log(arguments)}, function (features) {
                //view.mask.hide();
            });
            
            gmappanel6.poi.setMap(gmappanel6.getMap());
            
            gmappanel6.poi.setStyle(function(feature) {
                return {
                    icon: {
                        url: '/resources/softguard/images/poi/'+feature.getProperty('icon'),
                        labelOrigin: new google.maps.Point(11, 50)
                    }
                };
            });
            gmappanel6.poi.addListener('mouseover', function(event) {
                gmappanel6.poi.overrideStyle(event.feature, {label: {text:event.feature.getProperty('Name'), fontWeight: 'bold'}});
            });
            gmappanel6.poi.addListener('mouseout', function(event) {
                gmappanel6.poi.overrideStyle(event.feature, {label: null});
            });
        } else {
            if (gmappanel6.poi){
                gmappanel6.poi.setMap(null);
            }
        }
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        // mostrar el poi en el mapa o disparar evento
        var pais = view.pais?view.pais:view.up('poigridview').pais;
        var me = this;
		var mylat = record.get('Latitude'), 
            myLong = record.get('Longitude');
        var setCenter= {};
        var geocercaRecord = '';
        var model = this.getPoiModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        
        var listeners = {
			dragend : function(e) {
                var latlng = e.latLng;
				var lat = latlng.lat(), 
                    long = latlng.lng();
				record.set('Latitude', lat);
                record.set('Longitude', long);
                var geocoder = mappanel.getGeocoder();
                
                geocoder.geocode({
                	location: latlng
            		}, function(result, status){
                        if (status == 'OK'){
                            record.set('FullAddress', result[0].formatted_address);
                        }
        		})
			}
		}
        
        var icon = record.get('Icon');
        var iconUrl = '';
        
        if (icon){
            iconUrl = '/resources/softguard/images/poi/'+icon;
        }
        
        var marker = {
			title : record.get('Name'),
			draggable : true,
            icon: iconUrl,
            record: record
		}
            
        if (!mylat){
            setCenter={
                geoCodeAddr: pais,
                marker : marker,
				listeners : listeners
            }
        }else{
            setCenter={
                lat : mylat,
    			lng : myLong,
                marker : marker,
				listeners : listeners
            }
        }
		var mappanel = Ext.widget('gmappanel6', {
                    record: record,
					zoomLevel :16,
                    anchor:'100% 80%',
    		        setCenter : setCenter,
					gmapType : 'map',
					mapConfOpts : ['enableScrollWheelZoom',
							'enableDoubleClickZoom', 'enableDragging'],
					mapControls : ['GSmallMapControl', 'GMapTypeControl',
							'NonExistantControl']
				});
		var win = Ext.create('Ext.Window', {
			layout : 'anchor',
			title : 'Mapa',
			closable: false,
			width : 550,
			height : 450,
			border : false,
			items : [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
             		    xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        labelWidth: 50,
                        flex: 1,
                        value: record.get('Name'),
                        validator: function(value){
                            var find = record.store.findExact('Name', value);
                            if (find>=0){
                                return "Ya existe un punto con ese nombre.";
                            } else{
                                return true;
                            }
                            
                        },
                        listeners: {
                            blur: function(field, newValue){
                                if (field.isValid())
                                record.set('Name', field.getValue());
                            }
                        }
		            },{
                        xtype: 'combo',
                        itemId: 'comboTipo',
                        fieldLabel: 'Tipo',
                        name : 'Icon',
                    	displayField : 'text',
            			valueField : 'Name',
                        value: record.get('Icon'),
                        listConfig: {
                          getInnerTpl: function(displayField) {
                            return '<img src="/resources/softguard/images/poi/{Name}" class="icon"/> {' + displayField + '}';
                          }
                        },
                        allowBlank: false,
                        queryMode: 'local',
                        width: 230,
                        labelWidth: 30,
                        listeners: {
                            select: function(combo, records){
                                var name = records[0].get('Name');
                                record.set('Icon', name);
                                var iconUrl = '/resources/softguard/images/poi/'+name;
                                var image = new google.maps.MarkerImage(
                                    iconUrl
                                );
                                mappanel.cache.marker[0].setIcon(image)
                            }
                        }
    		        }
                ]},
                /*
                // esto lo sacamos poruqe tiene que estar relacionado a organization
                {
                            xtype: 'combo',
                            itemId: 'comboFlota',
                            fieldLabel: 'Flota',
                            name : 'CDealer',
                            displayField : 'dwm_dealer',
                        	valueField : 'dwm_dealer',
                            value: record.get('CDealer'),
                            allowBlank: true,
                            queryMode: 'local',
                            labelWidth: 30,
                            listeners: {
                                change: function(field, newValue){
                                    record.set('CDealer', newValue);
                                }
                            }
                        },
                */
                
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'poiAddress',
                            emptyText: getLocale('Dirección'),
                            value: record.get('FullAddress'),
                            flex: 1
                        },{
                            xtype: 'button',
        		            iconCls : 'icon-poi',
        					handler: function(button){
                                var form = button.up('window');
                                var address = form.down('#poiAddress').getValue();
                                var infoHtml = '';
                                var geocoder = mappanel.getGeocoder();
                                geocoder.geocode({
                            		address: address
                        		}, function(result, status){
                                    if (status == 'OK'){
                                        var location = result[0].geometry.location;
                                        var pos = new google.maps.LatLng(location.lat,location.lng);
                                        //mappanel.cache.marker[0].setPosition(pos);
                                        mappanel.getMap().setCenter(pos);
                                        mappanel.getMap().setZoom(14);
                            			record.set('Latitude', location.lat);
                                        record.set('Longitude', location.lng);
                                        record.set('FullAddress', result[0].formatted_address);
                                    }
                        		});   
        					}
        				}
                        
                    ]
                    
                },{
                    xtype:'fieldset',
                    title:'Geocerca',
                    itemId:'poigeocerca',
                    hidden:true,
                    layout:'hbox',
                    items:[{
                        xtype:'numberfield',
                        itemId:'radio',
                        
                    },{
                        xtype: 'button',
                        iconCls : 'save',
                        text: 'Guardar geocerca',
                        margin:'0 0 0 10',
    					handler: function(button){
                            var form = button.up('window');
                            
                            if(record.get('Id')==0) {
                                notify('Para poder generar una Geocerca debe guardar el POI primero')
                                return false;
                            }
                            
                                if(win.down('#radio').getValue()<= 0) {
                                notify('Para poder generar una Geocerca debe definir el radio')
                                return false;
                            }
                                
                            var metadata = Ext.create(me.getGeocercaMapModelModel());
                            var infoHtml = '';
                            
                            //DSS-601|adrianlara|20230410 => se saco la funcion de geocoder ya que no se usaba.
                            metadata.set('Type','circle')
                            metadata.set('Radius', parseFloat(win.down('#radio').getValue()))
                            metadata.set('CenterLat', record.get('Latitude'))
                            metadata.set('CenterLng', record.get('Longitude'))
                            metadata.set('Ref', Ext.JSON.encode({
                                type:'POI',
                                id: record.get('Id')
                            }))
                            
                            var modelGeocerca = me.getGeocercaModelModel().create({
                                GeoType:'I',
                                Dealer:'',
                                Name:record.get('Name'),
                                MetaData:Ext.JSON.encode(metadata.data)
                            }).save({callback:function (record) {
                                geocercaRecord = record
                                win.down('#poigeocerca').hide()
                                win.down('#editargeocerca').show()
                            }})
                                        
                                
                                var address = form.down('#poiAddress').getValue();
                                geocoder.geocode({
                                	address: address
                        		}, function(result, status){
                                    if (status == 'OK'){
                                        var location = result[0].geometry.location;
                                        
                                        metadata.set('Type','circle')
                                        metadata.set('Radius', parseFloat(win.down('#radio').getValue()))
                                        metadata.set('CenterLat', record.get('Latitude'))
                                        metadata.set('CenterLng', record.get('Longitude'))
                                        metadata.set('Ref', Ext.JSON.encode({
                                            type:'POI',
                                            id: record.get('Id')
                                        }))
                                        
                                        var modelGeocerca = me.getGeocercaModelModel().create({
                                            GeoType:'I',
                                            Dealer:'',
                                            Name:record.get('Name'),
                                            MetaData:Ext.JSON.encode(metadata.data)
                                        }).save({callback:function (record) {
                                            geocercaRecord = record
                                            win.down('#poigeocerca').hide()
                                            win.down('#editargeocerca').show()
                                        }})
                                        
                                    }
                        		});
                            
    					}
    				}]
                },
                mappanel
            ],
            tbar:[
                {
                    xtype: 'button',
                    iconCls : 'save',
                    text: 'Guardar',
					handler: function(button){
                        record.save({callback: function(records, operation, success){
                            if (success){
                                notify('Los datos se guardaron con éxito');
                                win.close();
                            }
                        }}); 
					}
				},
                {
                    xtype: 'button',
                    iconCls : 'icon-cancel',
                    text: 'Salir',
					handler: function(button){
                        if (record.get('Id') == 0){
                            record.store.remove(record);
                        }
                        
                        win.close();
					}
				},'-',
                {
                    xtype: 'button',
                    iconCls : 'save',
                    text: 'Editar geocerca',
                    itemId:'editargeocerca',
                    hidden:true,
        			handler: function(button){
                        var win2 = Ext.create('Ext.Window', {
                            layout: 'fit',
                            title : 'Mapa',
                            closable: false,
                            width : 750,
                            height : 450,
                            border : false,
                            items : [
                                {  
                                    xtype:'geocercaformview',
                                    record: geocercaRecord,
                                    caller: view
                                }
                            ]
                        }).show(); 
					}
				}
                ],
            listeners:{
                afterrender: function(view){
                    var searchName = 'resourcefile';
                    var path = '/softguard/images/poi';
                    view.path = path;
                    view.searchName = searchName;
                    var combo = view.down('#comboTipo');
                    
                    var store =Ext.create('Ext.data.Store',{
                        model: me.getPoiFileSearchModelModel(),
                        searchName: searchName,
                        path: path,
                        type: 'File',
                        pageSize: 500,
                        remoteSort: true,
                        remoteFilter: true,
                        listeners: {
                            beforeload: function(store,operation) {
                                operation.scope = store;
                            }
                        }
                    })
                    combo.bindStore(store);
                    store.load({
                        callback: function(records, operation, success){
                            combo.setValue(record.get('Icon'));
                        }
                    });
                    
                    /*
                    // por ahora saco las flotas
                    var flotas = Ext.create('Ext.data.Store', {
                        model: me.getTGFlotasByUserModelModel(),
                        autoLoad: false
                    });
                   
                    var comboFlota = view.down('#comboFlota');
                    comboFlota.bindStore(flotas);
                    flotas.load({
                        callback: function(records, operation, success){
                            if (records.length == 0){
                                comboFlota.hide();
                            } else{
                                comboFlota.setValue(record.get('CDealer'));
                            }
                        }
                    });
                    */
                    
                }
            }
		});
		win.show();
        if(record.get('Id') == 0) {
            win.down('#poigeocerca').show()
        } else {
            var store =Ext.create('Ext.data.Store',{
                model: 'SgAppMapGuardWeb'+'.model.GeocercaSearchModel',
                remoteFilter: true,
                filters: [{
                    property:'MetaData:LIKE',
                    value:Ext.JSON.encode(Ext.JSON.encode({
                        type:'POI',
                        id: record.get('Id')
                    }))
                }]
            });
            
            store.load({callback:function (records) {
                if(records.length>0) {
                    win.down('#editargeocerca').show()  
                    geocercaRecord = records[0]
                } else {
                    win.down('#poigeocerca').show()
                }
            }})
        }
	},
    
    onDeleteClick: function(button, object, options){
        var view= button.up('poigridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            //view.store.remove(selection);
            Ext.MessageBox.confirm('Confirmar', 'Está seguro que desea borrar?', function(btn){
                if (btn=="yes"){
                    view.store.remove(selection);
                    var delRec = view.store.getRemovedRecords();
                        Ext.Array.each(delRec, function (rec,k) {
                            rec.destroy({callback: function(record, operation){
                                    if (operation.success)
                                    {
                                        notify('Se eliminio exitosamente');
                                        
                                    }
                                    else
                                    {
                                       notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                                    }
                                    
                                    if(delRec.length-1 == k) {
                                        view.store.load();
                                    }
                            }
                        });
                    },this);
                }
            })
        }
    },
    onAddClick: function(button, object, options){
        var view= button.up('poigridview');
        var viewport = view.up('viewport');
        var record = view.record;
        var rec = this.getPoiModelModel().create({
            Name: getLocale('Nuevo punto de interés'),
            Organization: view.userdata.Company,
            Latitude: null,
            Longitude: null
        });
        
        view.store.insert(0, rec);
        this.onItemDblClick(view, rec);
        
    },
    /*
    onSaveClick: function (button,event,options) {
        var view = button.up('poigridview');
        
        var myStore = view.store;
        //guardo los nuevos
        var newRec = myStore.getNewRecords();
        Ext.Array.each(newRec, function (rec) {
            rec.save();
        },this);
        //guardo los modificados
        var modRec = myStore.getUpdatedRecords();
        Ext.Array.each(modRec, function (rec) {
            rec.save();
        },this);
        //borro los eliminados
        var delRec = myStore.getRemovedRecords();
        Ext.Array.each(delRec, function (rec) {
            var record = this.getPoiModelModel().create({
                Id: rec.get('Id')
            });
            record.destroy();
        },this);
    },
    */
    onSelectionChange: function(selectionModel, record, options){
        var view = selectionModel.view;
        var poigridview = view.panel;
        var viewport = Ext.getCmp('viewport');
        var gmap;
        
        
        if (poigridview.gmap){
            gmap = poigridview.gmap;
        } else {
            gmap = viewport.down('#googlemap');
        } 
        var selections = selectionModel.selected;
        
        var buttonDelete = poigridview.down('button[action=delete]');
        
        if (buttonDelete)
            buttonDelete.setDisabled(selections.length === 0);
        if (gmap){
            if (!poigridview.preventClear){
                gmap.clearMarkers();
            }
            gmap.markerList = selectionModel.selected.items;
        }
        
    },
    
    onImportClick: function (button,event,options) {
        var controller = this;
        var view = button.up('poigridview');
        var viewstore = view.store;
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getPoiByDealerSearchModelModel()
        });
        
        var poimodel = this.getPoiModelModel();
        store.load({callback: function(records){
            Ext.Array.each(records, function(record){
                record.set('Organization',view.userdata.Company);

                record.setConfig({
                    proxy: poimodel.getProxy()
                });
                record.save();
                controller.loadData(view);
            })
        }})
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('poigridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        var filters = Ext.clone(view.filters);
        
        if (!filters){
            filters = [];
        }
        
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query,
                id: fieldName
            });
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
    },
    
    onSearchAllClick: function(button, event, options) {  
        var view = button.up('poigridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        var filters = Ext.clone(view.filters);
        
        if (!filters){
            filters = [];
        }
        
        view.down('#query').setValue('');
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
    }
});