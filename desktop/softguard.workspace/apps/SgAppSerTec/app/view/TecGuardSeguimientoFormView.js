Ext.define('SgAppSerTec.view.TecGuardSeguimientoFormView', {
    extend:'Ext.form.Panel',
    alias : 'widget.tecguardseguimientoformview',
    title: 'Automonitoreo',
    layout: 'vbox',
    dockedItems: [{
        xtype: 'toolbar',
        items: [
            {
                text: 'Guardar',
                iconCls: 'save',
                itemId: 'save',
                action: 'save'
            }
        ]// cierro items
    }], // cierro dockeditems
    items: [
        {
            xtype: 'fieldset',
            title: 'Seguimiento',
            collapsed: false,
            collapsible: false,
            defaults: {
                margin:'0 0 10 0' 
            },
            items: [
                {
                    xtype : 'combobox',
                    fieldLabel : 'Disponible',
                    itemId: 'trackingEnabled',
                    name : "trackingEnabled",// 0- no disponible ,1- disponible apagado, 2 - diponible
                    store: [[0,getLocale('No disponible')],[2,getLocale('Disponible')]]
                },{
                    xtype : 'combobox',
                    fieldLabel : 'Frecuencia de reporte',
                    itemId: 'trackingTrigger',
                    name : "trackingTrigger",
                    store: [[2,getLocale('Frecuencia alta')],[1,getLocale('Frecuencia media')],[0,getLocale('Frecuencia baja')]]
                }
            ]
        }	
    ]// cierro items
});