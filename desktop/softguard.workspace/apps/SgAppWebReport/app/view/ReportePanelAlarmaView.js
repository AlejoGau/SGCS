Ext.define('SgAppWebReport.view.ReportePanelAlarmaView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.reportepanelalarmaview',
 
    layout : {
        type : 'hbox',
        align: 'stretch'
    },
    items : [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border : false,
            width:'100%'
        }
    ],
    activeHelp:true,
    initComponent: function(){

        this.callParent();
        //('cuentachanged');

            var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text: 'Imprimir',
                    iconCls : 'icon-printer',
                    itemId: 'btnprint',
                    action: 'btnprint'
                    /*handler: function(button){
                        var iframe = button.up('reportepanelalarmaview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        
                    }*/
                },
                 {
                    text : 'Filtros',
                    menu: {
                        xtype: 'menu',
                        width: 320,
                        items: [{
                                xtype: 'panel',
                                bodyPadding: 5,
                                items: [{
                                        xtype: 'combo',
                                        fieldLabel : 'Tipo de Panel',
                                        itemId: 'paneltipocombo',
                                        width: 300,
                                        editable : false,
                                        /* Indico que campo de la DB que hice Bind deseo mostrar
                                         * dentro del combo, en este caso fue de TablasPanelMode                                        
                                         */
                                        store : Ext.create('Ext.data.Store',{
                                            fields : [ 'name', 'defaultValue' ],
                                            data : [
                                                {name: 'GPRS', type: 'int', defaultValue: '1'},
                                                {name: 'TELEFONICO',  type: 'int', defaultValue: '0'}
                                            ],
                                            autoload : true
                                        }),
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'defaultValue',
                                        validator: function (value) {
                                            var view =  this.up('reportepanelalarmaview');
                                            if(value.length >0) {
                                                view.down('#panelgprscombo').setValue('');
                                                view.down('#panelcelularcombo').setValue('');
                                                view.down('#panelgprscombo').setDisabled(true);
                                                view.down('#panelcelularcombo').setDisabled(true);
                                            } else {
                                                view.down('#panelgprscombo').setDisabled(false);
                                                view.down('#panelcelularcombo').setDisabled(false);
                                            }
                                            return true;
                                        },
                                        //plugins : ['clearbutton']
                                    },{
                                        xtype: 'combo',
                                        fieldLabel : 'Nombre del Panel',
                                        itemId: 'panelgprscombo',
                                        width: 300,
                                        editable : false,
                                        /* Indico que campo de la DB que hice Bind deseo mostrar
                                         * dentro del combo, en este caso fue de TablasPanelModel
                                         */
                                    	displayField: 'pan_cdescripcion',
                    				    valueField: 'pan_ccodigo',
                                        name: 'pan_ccodigo',
                                        queryMode: 'local',
                                        validator: function (value) {
                                            var view =  this.up('reportepanelalarmaview');
                                            if(value.length > 0) {
                                                view.down('#paneltipocombo').setValue('');
                                                view.down('#paneltipocombo').setDisabled(true);
                                            } else {
                                                view.down('#paneltipocombo').setDisabled(false);
                                            }
                                            
                                            return true;
                                        },
                                        //plugins : ['clearbutton']
                                    },{
                                        xtype: 'combo',
                                        fieldLabel : 'Nombre del Equipo Celular',
                                        itemId: 'panelcelularcombo',
                                        width: 300,
                                        editable : false,
                                        /* Indico que campo de la DB que hice Bind deseo mostrar
                                         * dentro del combo, en este caso fue de TablasPanelModel
                                         */
                                        displayField: 'pan_cdescripcion',
                    				    valueField: 'pan_ccodigo',
                                        name: 'pan_cgprs',
                                        queryMode: 'local',
                                        validator: function (value) {
                                            var view =  this.up('reportepanelalarmaview');
                                            if(value.length >0) {
                                                view.down('#paneltipocombo').setValue('');
                                                view.down('#paneltipocombo').setDisabled(true);
                                            } else {
                                                view.down('#paneltipocombo').setDisabled(false);
                                            }
                                            
                                            return true;
                                        },
                                        //plugins : ['clearbutton']
                                    }]
                            }]
                    }
                },{
                    xtype: 'button',
                    text:'Buscar',
                    iconCls: 'icon-find',
                    action: 'search'
                },'->',{
                    xtype : 'button',
                    text: 'Exportar',
                    iconCls : 'icon-page-excel',
                    action : 'export'
                }
            ]// cierro items
         }); 

        this.addDocked(toolbar);
    }
});