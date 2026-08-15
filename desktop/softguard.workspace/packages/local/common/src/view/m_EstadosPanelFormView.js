//MIGRADO2024
Ext.define('Common.view.m_EstadosPanelFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.m_estadospanelformview'],
    preventHeader: true,
    frame: true,
    border : 0,
    fieldDefaults : {
        labelAlign : 'left',
        labelWidth : 100,
        enforceMaxLength: true
    },
    selType: 'checkboxmodel',
	items : [
        {
            xtype:'selecterfield',
            itemId:'mep_cAlarmaControl',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Alarma',
                    field:'Descripcion',
                    searchField:'o.[cod_cdescripcion]'
                },
                selecionado: {
                    title:'Alarma',
                    field:'Descripcion'
                },
                valueField:'cod_ccodigo',
             //   prefijoParaFiltro:'o',
                modelItems: 'Common.model.SoftguardCodigoAlarmaModel',
                eventosSeleccionados: ''
                    
            },
            title:'Alarma control'
        
        },{
            xtype:'selecterfield',
            itemId:'mep_iUsuarioControl',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Usuario',
                    field:'usu_cnombre',
                    searchField:'o.[usu_cnombre]'
                },
                selecionado: {
                    title:'Usuario',
                    field:'usu_cnombre'
                },
                valueField:'usu_idKey',
                prefijoParaFiltro:'o',
                modelItems: 'Common.model.UsuarioSearchModel'
                    
            },
            title:'Usuario control'
        
        },{
            xtype:'selecterfield',
            itemId:'mep_cAlarmaEsperada',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Alarma',
                    field:'Descripcion',
                    searchField:'o.[cod_cdescripcion]'
                },
                selecionado: {
                    title:'Alarma',
                    field:'Descripcion'
                },
                valueField:'cod_ccodigo',
              //  prefijoParaFiltro:'o',
                modelItems: 'Common.model.SoftguardCodigoAlarmaModel'
                    
            },
            title:'Alarma espera'
        
        },{
            xtype:'selecterfield',
            itemId:'mep_iUsuarioEsperado',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Usuario',
                    field:'usu_cnombre',
                    searchField:'o.[usu_cnombre]'
                },
                selecionado: {
                    title:'Usuario',
                    field:'usu_cnombre'
                },
                valueField:'usu_idKey',
                prefijoParaFiltro:'o',
                modelItems: 'Common.model.UsuarioSearchModel'
                    
            },
            title:'Usuario espera'
        
        },{
            xtype:'selecterfield',
            itemId:'mep_cAlarmaAGenerar',
            simpleSelect: true,
            config: {
                disponible: {
                    title:'Alarma',
                    field:'Descripcion',
                    searchField:'o.[cod_cdescripcion]'
                },
                selecionado: {
                    title:'Alarma',
                    field:'Descripcion'
                },
                valueField:'cod_ccodigo',
               // prefijoParaFiltro:'o',
                modelItems: 'Common.model.SoftguardCodigoAlarmaModel'
                    
            },
            title:'Alarma generar'
        
        },
        
        {
            xtype:'numberfield',
            itemId:'mep_iMinutos',
            fieldLabel:'Minutos'
        },{
                
            xtype : 'combo',
        	fieldLabel : 'Autoprocesar',
            itemId: 'mep_iAutoProcesa',
			store : [[1,getLocale('Si')],[0,getLocale('No')]],
            queryMode: 'local'
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