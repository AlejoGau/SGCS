//MIGRADO2024
Ext.define('Common.view.p_controlAcceso_AutorizacionFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.p_controlacceso_autorizacionformview'],
    border : 0,
    bodyPadding:5,
    items : [
        {
            xtype:'displayfield',
            fieldLabel:'Usuario',
            itemId:'usuario'
        },{
            xtype : 'datefield',
            fieldLabel: 'Fecha desde',
            name:'caa_fechadesde',
            minValue:new Date(),
            format : 'd-m-Y'
        },{
            xtype : 'datefield',
            fieldLabel: 'Fecha hasta',
            name:'caa_fechahasta',
            minValue:new Date(),
            format : 'd-m-Y'
        }/*,{
            xtype : 'combo',
            fieldLabel: 'Dia de la semana',
            name:'caa_diasemana',
            store:[
                [0, getLocale('Todos los dias de la semana')],
                [1, getLocale('Lunes')],
                [2, getLocale('Martes')],
                [3, getLocale('Miercoles')],
                [4, getLocale('Jueves')],
                [5, getLocale('Viernes')],
                [6, getLocale('Sabado')],
                [7, getLocale('Domingo')]
                ]
        }*/
        
        ,{
            xtype: 'checkboxgroup',
            fieldLabel: 'Dia de la semana',
            columns: 2,
            vertical: true,
            itemId:'caa_diasemana',
            items: [
                { boxLabel: getLocale('Lunes'), name: 'caa_diasemana', inputValue: 1 },
                { boxLabel: getLocale('Martes'), name: 'caa_diasemana', inputValue: 2 },
                { boxLabel: getLocale('Miercoles'), name: 'caa_diasemana', inputValue: 3 },
                { boxLabel: getLocale('Jueves'), name: 'caa_diasemana', inputValue: 4 },
                { boxLabel: getLocale('Viernes'), name: 'caa_diasemana', inputValue: 5 },
                { boxLabel: getLocale('Sabado'), name: 'caa_diasemana', inputValue: 6 },
                { boxLabel: getLocale('Domingo'), name: 'caa_diasemana', inputValue: 7 }
            ]
        },{
            xtype:'checkbox',
            fieldLabel:'Todo el dia',
            itemId:'todoeldia'
        },{
            xtype : 'timefield',
            fieldLabel: 'Hora desde',
            name:'caa_horadesde',
            itemId:'caa_horadesde',
            format:'H:i',
            submitFormat :'H:i',
        },{
            xtype : 'timefield',
            fieldLabel: 'Hora hasta',
            name:'caa_horahasta',
            itemId:'caa_horahasta',
            format:'H:i',
            submitFormat :'H:i',
        },{
            xtype : 'combo',
            fieldLabel: 'Estado',
            name:'caa_estado',
            store:[
                [1, getLocale('Activo')],
                [0, getLocale('Inactivo')]
                ]
        }
    ],
    initComponent : function() {
		this.callParent();
        
      //  this.down('p_controlacceso_ioview').record = this.record
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-table-save',
                    text: 'Generar ingreso',
                    scope: this,
                    action: 'save',
                    formBind : true
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});