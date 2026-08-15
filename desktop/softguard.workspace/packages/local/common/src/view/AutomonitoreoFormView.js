//MIGRADO2024
Ext.define('Common.view.AutomonitoreoFormView', {
    extend:'Ext.form.Panel',
    alias : 'widget.automonitoreoformview',
    title: 'Automonitoreo',
    //autoScroll: true,
    layout: 'vbox',
    dockedItems: [{
        xtype: 'toolbar',
        items: [
         {
            text: 'Guardar',
            iconCls: 'save',
            action: 'save'
        }
        ]// cierro items
    }], // cierro dockeditems
    items: [
        {
            xtype: 'combo',
            fieldLabel: 'Autoprocesamiento de eventos',
            store: 'SiNoStore',
    	    name:'cue_nAutoMonitoreo',
            valueField : 'Value',
            displayField : 'Name',
            queryMode: 'local',
            forceSelection: true,
            width: 500,
            labelWidth: 250
        },
        {
            xtype: 'combo',
            fieldLabel: 'Prioridad de eventos a autoprocesar',
            store:[
                [1, getLocale('1 en adelante (todos)')],
                [2, getLocale('2 en adelante')],
                [3, getLocale('3 en adelante')],
                [4, getLocale('4 en adelante')],
                [5, getLocale('5 en adelante')],
                [6, getLocale('6 en adelante')],
                [7, getLocale('7 en adelante')],
                [8, getLocale('8 en adelante')],
                [9, getLocale('9')]
            ],
            name:'cue_nPrioridad',
            width: 500,
            labelWidth: 250
        }	
    ]// cierro items
           
});