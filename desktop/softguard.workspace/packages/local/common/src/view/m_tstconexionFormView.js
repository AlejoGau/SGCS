//MIGRADO2024
Ext.define('Common.view.m_tstconexionFormView', {
    extend:'Ext.panel.Panel',
    alias : 'widget.m_tstconexionformview',
    title: 'Control test conexión',
    bodyPadding: 0,
    autoScroll: true,
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    text: 'Guardar',
                    iconCls: 'save',
                    action: 'save'
                },{
                    iconCls : 'delete',
                    text    : 'Eliminar',
                    itemId: 'delete',
                    action  : 'delete'
                }
            ]// cierro items toolbar
        }
    ], // cierro dockeditems
    items: [ 
		{
            xtype:'form',
            itemId:'formtest',
            items:[
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Cada (minutos)',
                    name: 'txc_iMinutos'
                },
                {
                    xtype:'checkbox',
                    fieldLabel:'Controlar todos los eventos',
                    labelWidth: 250,
                    itemId: 'cualquiera2'
                },
                {
                    xtype:'eventselecterfield',
                    itemId:'txc_cAlarmaEsperada',
                    filter:[],
                    simpleSelect: true,
                    title: getLocale('Evento a Controlar')
                },
                {
                    xtype:'eventselecterfield',
                    itemId:'txc_cAlarmaAGenerar',
                    filter:[],
                    simpleSelect: true,
                    title: getLocale('Alarma a Generar')
                },
                {
                    xtype:'eventselecterfield',
                    itemId:'txc_cAlarmaAutoprocesa',
                    filter:[],
                    simpleSelect: false,
                    title: getLocale('Autoproceso de Alarma a generar'),
                    limitEventSelect: 30
                },{
                    xtype : 'combo',
                    fieldLabel : 'Conexion Ip',
                    itemId: 'conexionip',
                    name : 'txc_idIRSConn',			
                    displayField : 'ipc_cdescripcion',
                    valueField : 'iprsc_ipcidkey',
                    emptyText: 'Seleccione',
                    anchor : '100%',
                    queryMode: 'local',
                    allowBlank: false
                }
		    ] // items form
        } // form
    ]// cierro items view
});