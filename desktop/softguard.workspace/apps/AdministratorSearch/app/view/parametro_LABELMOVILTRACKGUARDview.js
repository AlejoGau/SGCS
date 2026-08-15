Ext.define('AdministratorSearch.view.parametro_LABELMOVILTRACKGUARDview', {
    extend : 'Ext.form.Panel',
    alias : ['widget.paramentro_LABELMOVILTRACKGUARDview'],
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
            xtype : 'button',
            text : 'Agregar',
            menu: {
                xtype: 'menu',
                itemId: 'etiquetas',
                items: [
                ]
            }
        },
        {
            xtype: 'textarea',
            name: 'par_cvalor',
            fieldLabel:'Valor',
            anchor:'100%',
            id: 'plantillatrackguard',
            alowBlank: false
        }
    ],

    htmlentities: function (string) {
        return string;  
    },
	initComponent : function() {
		this.callParent();
        this.listaEtiquetas = [
            {etiqueta:'{Name}'},
            {etiqueta:'{Domain}'},                            
            {etiqueta:'{ObjectTypeName}'},
            {etiqueta:'{Situacion}'},
            {etiqueta:'{cod_cdescripcion}'},
            {etiqueta:'{cue_clinea}'},
            {etiqueta:'{cue_cnombre}'},
            {etiqueta:'{cue_ncuenta}'},
            {etiqueta:'{gps_rLatitud}'},
            {etiqueta:'{gps_rLongitud}'},
            {etiqueta:'{gps_iVelocidad}'},                            
            {etiqueta:'{lin_crazonsocial}'},
            {etiqueta:'{sta_cultimaalarma}'},
            {etiqueta:'{sta_dfechautimaalarma}'},
            {etiqueta:'{tip_cdescripcion}'}
        ];
                            
        var t = this;
         Ext.Array.each(this.listaEtiquetas, function (rec,i) { 
             t.down('#etiquetas').add({
                 xtype:'button',
                 text: t.htmlentities(rec.etiqueta),
                 itemId: 'etiqueta'+i,
                 listeners: {
                     click: function () {
                          var myTextArea = document.getElementById('plantillatrackguard-inputEl');
                          var textInArea = myTextArea.value;
                          var textToInsert = rec.etiqueta;
                          var caretPosition = myTextArea.selectionStart;
                          myTextArea.value = textInArea.substring(0, caretPosition) + textToInsert  + textInArea.substring(caretPosition); 
                     }
                 }
             });
         });
	} // cierro init
});