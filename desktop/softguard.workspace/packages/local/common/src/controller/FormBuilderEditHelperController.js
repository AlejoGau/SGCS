Ext.define('Common.controller.FormBuilderEditHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'fieldsModel' ],
    views : [ 'FromBuilderEditHelperView' ],

    init : function(config) {
        // genero los eventos
        this.control({
    		'formbuilderedithelperview' : {
				afterrender : this.initview,
                changebaseform: this.onChangeBaseForm
			},
            'formbuilderedithelperview #enviarcaller' : {
				click : this.onEnviarAlCallerClick
			}
        });
	}, 

    onChangeBaseForm: function (view, template, value) {
        view.down('#formulario').removeAll()
        if(template) {
            view.down('#formulario').add(template)
            
            Ext.Array.each(value, function (v) {
                var comp = view.down('[name="'+v.name+'"]');
                if(comp && comp.xtype != 'fieldset') {
                    comp.setValue(v.value);
                }
            })
        }
    },
   
    onEnviarAlCallerClick: function (btn){
        var view = btn.up('formbuilderedithelperview')
        var items = [];
        Ext.Array.each(view.down('#formulario').items.items, function (v,k) {
            items.push({
                name:v.name,
                value:v.value
            })
        })
        //mando al caller
        view.caller.fireEvent('changedform',items, view.caller)
        view.up('window').close()
    },

	initview : function(view) {
        this.onChangeBaseForm(view,view.fields,view.formValues)
	}
});