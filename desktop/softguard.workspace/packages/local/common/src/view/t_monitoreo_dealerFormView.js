//MIGRADO2024
Ext.define('Common.view.t_monitoreo_dealerFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.t_monitoreo_dealerformview'],
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
                
            xtype : 'combo',
        	fieldLabel : 'Dia de la semana',
            itemId: 'diasemana',
			name : 'tmd_diasemana',
			store : [
                [0, getLocale('Domingo')],
                [1, getLocale('Lunes')],
                [2, getLocale('Martes')],
                [3, getLocale('Miercoles')],
                [4, getLocale('Jueves')],
                [5, getLocale('Viernes')],
                [6, getLocale('Sabado')]
                ],			
        	
            anchor : '100%',
            queryMode: 'local'
		},{
            fieldLabel: 'Hora desde',
            name: 'tmd_horadesde',
            itemId: 'tmd_horadesde',
            xtype: 'timefield',
            format: 'H:i',
            submitFormat : 'H:i',
            increment: 1
        },{
            fieldLabel: 'Hora hasta',
            name: 'tmd_horahasta',
            itemId: 'tmd_horahasta',
            xtype: 'timefield',
            submitFormat : 'H:i',
            format: 'H:i',
            increment: 1
        },{
                
            xtype : 'combo',
            fieldLabel : 'Estado',
            itemId: 'estado',
			name : 'tmd_estado',
			store : [
                [0, getLocale('Desactivado')],
                [1, getLocale('Activo')]
                ],			
        	
            anchor : '100%',
            queryMode: 'local'
		},{
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
                    modelItems: 'AdministratorSearch.model.OrganizationSearchModel'
                        
                },
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