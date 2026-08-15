var tinyCfg1 = {
	// General options
	theme : "advanced",

	skin: "extjs",
    inlinepopups_skin: "extjs",
		
    // Original value is 23, hard coded.
    // with 23 the editor calculates the height wrong.
    // With these settings, you can do the fine tuning of the height
    // by the initialization.
    theme_advanced_row_height: 27,
    delta_height: 1,
    
    // hace lio con las URLs
    relative_urls : false,
    convert_urls : 0,
    remove_script_host : 0,
    //
    
    schema: "html5",
    
    plugins : "autolink,lists,pagebreak,style,table,advhr,advimage,advlink,inlinepopups,insertdatetime,preview,media,searchreplace,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,wordcount,advlist",
    
		// Theme options
		theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
		theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
		theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,media,advhr,|,fullscreen",
		theme_advanced_buttons4 : "styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,pagebreak,restoredraft",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom"
    
		// Example content CSS (should be your site CSS)
		//,content_css : "contents.css"
};


Ext.define('SGWebCrm.view.ContentDescriptionFormView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.contentdescriptionformview',
    title : 'Propiedades',
    bodyPadding : 0,    
    layout: 'fit',
    items : [
        {
    	    xtype: 'htmleditor',
            name: 'Body',
            labelWidth: 0,
            fieldLabel: '',
            listeners: {
                sync: function(editor, html){
                    var view = editor.up('contentdescriptionformview');
                    var record = view.record;
                    record.set('Body', html);
                }
            }
		},
        
        /*
        {
            xtype: 'tinymce_textarea',
            fieldStyle: 'font-family: Courier New; font-size: 12px;',
            noWysiwyg: false,
            tinyMCEConfig: tinyCfg1,
            name: 'Body'
        }
        */
    ],
	initComponent : function() {
		this.callParent();      
        // agrego la toolbar
        this.loadRecord(this.record);
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
	} // cierro init
});