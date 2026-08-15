Ext.define('Common.view.FromBuilderEditHelperView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.formbuilderedithelperview'],
    title : '',
    frame : false,   
    autoScroll:true,
    bodyPadding : 5,    
    fieldDefaults : {
        labelWidth : 150,
        labelAlign: 'left', 
        editable:false
    },
    items : [
        {
            xtype:'fieldset',
            //title:'Ajustar valores template',
            itemId:'formulario',
            height: 100,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items:[
                    
                ]
        }/*,{
            xtype:'button',
            text:'Listo',
            itemId:'enviarcaller'
        }*/
    ],
    
    getValue: function () {
        var items = [];
        Ext.Array.each(this.down('#formulario').items.items, function (v,k) {
            items.push({
                name:v.name,
                value:v.value
            })
        })
        
        return items;
    },
    
	initComponent : function() {
		this.callParent();
        this.down('fieldset').cls = this.cls;


        
	} 

});
