//MIGRADO2024
Ext.define('Common.view.AdicionalesVictimariosView', {
    extend:'Ext.form.Panel',
    alias : 'widget.adicionalesvictimarioview',
    //autoScroll: true,
    layout: 'vbox',
    style: 'margin: 0 0 0 7px;',
    items: [
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Señas Particulares',
            width: 700,
            layout: 'anchor',
            items: [
                {
                    xtype: 'textarea',
                    grow: true,
                    anchor: '100%',
                    itemId: 'senas',
                    maxLength: 500,
                    name: 'not_mnotaprincipal',
                    margin: '8px 8px 8px 8px'
                } 
            ]
        },
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Caracterisiticas Sociales',
            layout: 'anchor',
            width: 700,
            items: [
                {
                    xtype: 'textarea',
                    grow: true,
                    anchor: '100%',
                    itemId: 'sociales',
                    maxLength: 500,
                    name: 'not_mnotaprincipal',
                    margin: '8px 8px 8px 8px'
                } 
            ]
        },
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Adicciones',
            layout: 'anchor',
            width: 700,
            items: [
                {
                    xtype: 'textarea',
                    grow: true,
                    itemId: 'adicciones',
                    anchor: '100%',
                    maxLength: 500,
                    name: 'not_mnotaprincipal',
                    margin: '8px 8px 8px 8px'
                }
            ]
        },
        {
			xtype : 'button',
			text : 'Selector de Documentos',
			iconCls : '',
			action: 'selecDoc',
            width: 200,
            labelWidth: 75,
            style: 'margin: 10px 0 5px 0;'
        }
        
    ]
           
});