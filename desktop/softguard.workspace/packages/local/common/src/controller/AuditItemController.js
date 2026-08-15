//MIGRADO2024
Ext.define('Common.controller.AuditItemController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'AuditItemSearchModel' ],
    views : [ 'AuditItemGridView' ],
    init : function(config) {
		// genero los eventos
		this.control({
			'audititemgridview' : {
				afterrender : this.initView
			}
		});
	}, // cierro init
	initView : function(view) {
        var me = this;
        var record = view.record;
        var store =Ext.create('Ext.data.Store',{
            model: this.getAuditItemSearchModelModel(),
            pageSize: 250
        })
        store.load({params: {Id: record.data.Id}, callback: function(records, operation, success){
            var newData = records[0].get('XmlNew');
            var oldData = records[0].get('XmlOld');
            var newdenom = records[0].get('NewValueDenom')!=''?Ext.JSON.decode(records[0].get('NewValueDenom')):null;
            var olddenom = records[0].get('OldValueDenom')!=''?Ext.JSON.decode(records[0].get('OldValueDenom')):null;
            var newDoc = me.getParsedXMLDoc(newData);
            var newNodes = newDoc.firstChild.firstChild.childNodes;
            var oldDoc = me.getParsedXMLDoc(oldData);
            var oldNodes = oldDoc.firstChild.firstChild.childNodes;
            
            Ext.Array.each(newNodes, function(node, index){
                var oldValue = oldNodes[index]&&oldNodes[index].firstChild? oldNodes[index].firstChild.nodeValue : '';
                var newValue = node.firstChild ? node.firstChild.nodeValue : '';
                
                if (oldValue != null && oldValue.trim() != newValue.trim() || record.data.ObjectName=='t_parametros' || record.data.FunctionId == 3|| record.data.FunctionId == 4){
                    // si esta desnormalizado reemplazo por esos valores
                    //console.log(node.tagName,oldValue,newValue)
                    if (newdenom && newdenom.hasOwnProperty(node.tagName)){
                        newValue = newdenom[node.tagName];
                    }
                    if (olddenom && olddenom.hasOwnProperty(node.tagName)){
                        oldValue = olddenom[node.tagName];
                    }
                    view.getStore().add({field: node.tagName,newValue: newValue , oldValue: oldValue});
                } 
            });
        }});
	},
    
    getParsedXMLDoc: function(str){
        var doc;
        if(window.ActiveXObject){
          doc = new ActiveXObject("Microsoft.XMLDOM");
          doc.async = "false";
          doc.loadXML(str);
        }else{
          doc = new DOMParser().parseFromString(str,"text/xml");
        }
        
        return doc
    }
});