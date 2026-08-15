Ext.define('AdministratorSearch.view.t_monitoreo_dealerFormExtendedView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_monitoreo_dealerformextendedview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    items : [
            {
                    xtype:'fieldset',
                    title: getLocale('Seleccion de dias y horarios de control'),
                    items: [
                        {
                            xtype: 'combo',
                            store: [
                                [1,getLocale('Todos los dias de la semana')],
                                [2,getLocale('Luneas a viernes')],
                                [3,getLocale('Dias de la semana')],
                                [4,getLocale('Siempre')]
                            ],
                            queryMode: 'local',
                            name: 'programtype',
                            fieldLabel: 'Repite',
                            itemId:'comboprogramtype',
                            allowBlank : false
                        },{
                            xtype: 'container',
                    		layout: 'vbox',
                			items:[
                                {
                                    xtype: 'checkboxgroup',
                                    fieldLabel: 'Dia de la semana',
                                    itemId: 'combodayofweek',
                                    name:'dayofweek',
                                    hidden:true,                    
                                    width:400,
                                    items: [
                                            {
                                                boxLabel: 'D',
                                                name: 'dayofweek',
                                                inputValue: '0',
                                                uncheckedValue: 0,
                                                labelWidth:30,
                                                itemId:'day-0'
                                            },{
                                                boxLabel: 'L',
                                                name: 'dayofweek',
                                                inputValue: '1',
                                                uncheckedValue: 0,
                                                labelWidth:30,
                                                itemId:'day-1'
                                            },{
                                                boxLabel: 'M',
                                                name: 'dayofweek',
                                                inputValue: '2',
                                                uncheckedValue: 0,
                                                labelWidth:30,
                                                itemId:'day-2'
                                            },{
                                                boxLabel: 'M',
                                                name: 'dayofweek',
                                                inputValue: '3',
                                                uncheckedValue: 0,
                                                labelWidth:30,
                                                itemId:'day-3'
                                            },{
                                                boxLabel: 'J',
                                                name: 'dayofweek',
                                                inputValue: '4',
                                                uncheckedValue: 0,
                                                labelWidth:30,
                                                itemId:'day-4'
                                            },{
                                                boxLabel: 'V',
                                                name: 'dayofweek',
                                                inputValue: '5',
                                                uncheckedValue: 0,
                                                labelWidth:30,
                                                itemId:'day-5'
                                            },{
                                                boxLabel: 'S',
                                                name: 'dayofweek',
                                                inputValue: '6',
                                                uncheckedValue: 0,
                                                labelWidth:30,
                                                itemId:'day-6'
                                            }
                                        ]
                                },
                                {
                                    xtype:'container',
                                    layout:'hbox',
                                    itemId:'containerhoras',
                                    width:400,
                                    items:[{
                                        fieldLabel: 'Hora desde',
                                        name: 'tmd_horadesde',
                                        itemId: 'tmd_horadesde',
                                        xtype: 'timefield',
                                        format: 'H:i',
                                        submitFormat : 'H:i',
                                        increment: 1,
                                        width:'49%'
                                    },{
                                        fieldLabel: 'Hora hasta',
                                        name: 'tmd_horahasta',
                                        itemId: 'tmd_horahasta',
                                        xtype: 'timefield',
                                        submitFormat : 'H:i',
                                        format: 'H:i',
                                        increment: 1,
                                        width:'49%'
                                    }]
                                }
                                

                                   
                    ]
                },
            ]
        },{
                
            xtype : 'combo',
            fieldLabel : 'Estado',
            itemId: 'estado',
    		name : 'tmd_estado',
			store : [
                [0, getLocale('Desactivado')],
                [1, getLocale('Activado')]
                ],			
        	
            anchor : '100%',
            queryMode: 'local'
		}
        ,{
                xtype:'selecterfield',
                itemId:'organizacion',
                simpleSelect: true,
                config: {
                    disponible: {
                        title:'Organizacion',
                        field:'Name',
                        searchField:'o.[Name]'
                    },
                    selecionado: {
                        title:'Organizacion',
                        field:'Name'
                    },
                    valueField:'Id',
                    prefijoParaFiltro:'o',
                    modelItems: 'Common.model.OrganizationSearchModel'

                },
                filter:[{
                    property:'Status:ININT',
                    value:'7,8,9'
                }],
                title:'Organizacion'
            
            }
    ],

	initComponent : function() {
        
		this.callParent();
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});