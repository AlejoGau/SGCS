//MIGRADO2024
Ext.define('Common.view.GeocercaFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.geocercaformview'],
    title : '',
    //preventHeader: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    showtoolbar: true,
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 120,
        anchor : '100%',
		labelAlign: 'left'					
	},
    //bodyPadding :0,
	items : [
        
         {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Nombre',
                itemId: 'Name',
                labelWidth: 50,
                margin: '0 5 0 0',                
                validator: function(value){
                    var t = this;
                    if(value != this.originalValue) {      
                        var filters = [{
                            property : 'g.Name',
                            value : value
                        }];      
                
                        var model = 'SgAppMapGuardWeb.model.GeocercaSearchModel';
                
                        var storeSP =Ext.create('Ext.data.Store',{
                            model: model,
                            pageSize: 50,
                            remoteFilter: true,
                            filters: filters
                        })
                        
                        storeSP.load({callback: function (records, operation, success) {
                            if (records.length > 0){
                                
                                t.markInvalid('El nombre ya existe');
                                t.textValid = false;
                            } else {
                                t.clearInvalid();
                                t.textValid = true;
                            }   
                        }})
                    } else {
                        t.clearInvalid();
                        t.textValid = true;
                    }
                     return t.textValid;
                }
            },{
         	    xtype: 'combo',
                itemId: 'comboFlota',
                fieldLabel: 'Dealer',
                labelAlign: 'right',
                name : 'Dealer',
                //store : 'TablaLineasStore',
            	displayField : 'lin_crazonsocial',
    			valueField : 'lin_ccodigo',
                allowBlank: true,
                queryMode: 'local',
                labelWidth: 50
	        },{
                xtype: 'combo',
                itemId: 'comboTipo',
                labelAlign: 'right',
                fieldLabel: 'Tipo',
                name : 'GeoType',
                itemId: 'GeoType',
             //   value: record.get('GeoType'),
                allowBlank: false,
                queryMode: 'local',
                labelWidth: 50,
                store: [
                    ['I',getLocale('Inclusión')],
                    ['E',getLocale('Exclusión')],
                    ['X',getLocale('Inclusión o Exclusión')]]
	        }
            ,{
                xtype: 'combo',
                itemId: 'comboGrupo',
                fieldLabel: 'Grupo',
                labelAlign: 'right',
                name : 'Grupo',
            	displayField : 'grg_cdescripcion',
    			valueField : 'Id',
                allowBlank: true,
                queryMode: 'local',
                labelWidth: 50
	        }
            /*{
                xtype:'textfield',
                value:'I',
                hidden:true,
                name : 'GeoType',
                itemId: 'GeoType'
            },{
                xtype:'displayfield',
                fieldLabel: 'Tipo',
                value:'Inclusión',
                labelWidth: 50,
                margin:'0 0 0 10'
            }*/
        ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            itemId: 'contId',
            items: [  
            {
                xtype: 'textfield',
                itemId: 'poiAddress',
                emptyText: getLocale('Dirección'),
                flex: 1
            },{
                xtype: 'button',
	            iconCls : 'icon-poi',
                itemId: 'poiButton',
				handler: function(button){
                    var view = button.up('geocercaformview');
                    var form = button.up('window');
                    var address = form.down('#poiAddress').getValue();
                    var infoHtml = '';
                    var geocoder = view.down('gmappanel6').getGeocoder();
                    geocoder.geocode({
                		address: address
            		}, function(result, status){
                        if (status == 'OK'){
                            var location = result[0].geometry.location;
                            var pos = new google.maps.LatLng(location.lat,location.lng);
                            //mappanel.cache.marker[0].setPosition(pos);
                            view.down('gmappanel6').getMap().setCenter(pos);
                            view.down('gmappanel6').getMap().setZoom(14);
                        }
            		});   
				}
			}
            ]
        },{
            xtype: 'gmappanel6',
            cls: 'gmappanel6',
            itemId: 'googlemap',
            flex: 1,
			gmapType : 'map',
            onlyRead: true,
            mapConfOpts:  { 
                scrollwheel: true, 
                disableDoubleClickZoom: false, 
                draggable: true, 
                streetViewControl: false, 
                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: true
                }
            }
        }
        /*{
            xtype: 'gmappanel6',
            flex: 1,
    		zoomLevel : 4,
			gmapType : 'map',
            
			mapConfOpts : ['enableScrollWheelZoom',
					'enableDoubleClickZoom', 'enableDragging'],
			mapControls : ['GSmallMapControl', 'GMapTypeControl',
					'NonExistantControl']
		}*/
        
    ],
	initComponent : function() {
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    text: 'Guardar',
                    itemId: 'savebtn',
                    action: 'save'
                    
		        },{
                    xtype: 'button',
                    text: 'Cancelar',
                    itemId: 'cancelbtn',
                    action: 'cancel',
                    handler: function(button){
                        var win = button.up('window');
                        win.close();
                    }
		        }
               
            ]
         }); 
        if (this.showtoolbar)
            this.addDocked(toolbar);
       
	} // cierro init
});