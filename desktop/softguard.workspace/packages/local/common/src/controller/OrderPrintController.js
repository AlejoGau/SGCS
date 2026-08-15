Ext.define('Common.controller.OrderPrintController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'OrderItemSearchModel' ],
    views : [ 'Common.view.OrderPrintView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'orderprintview' : {
                afterrender : this.initView
            }
		});
        
	}, // cierro init
    
    initView: function(view){
        
        
        var record = view.record;
        var recordSearch = view.recordSearch;
        var parentorderid = record.get('Id');
        
        
        var target = view.down('#Iframe');
        target.getDoc().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getOrderItemSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true
        });
        store.filter({
            property: 'orderId',
            value: parentorderid
        });
                
                
                
        
                
        store.load({
            callback: function(records, operation, success) {
                if (success) {
                    
                    
                    var items = Ext.encode(Ext.Array.pluck(store.data.items, 'data'));
                    record.data.DateCreated =  Ext.Date.format( new Date(record.get('DateCreated')),'d-m-Y')
                    
                    var info = Ext.encode(record.data);
                    var infoSearch = recordSearch ? Ext.encode(recordSearch.data) : info;
                  
                    
                    view.baseurl = '/handler/OrderPrintHtml';
                    
                    var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
                    
                    var ele = target.getEl();
                    
                    
                    
                    var iframeDom =  document.getElementById('iframe-'+ele.id);
                    
                                      
                   // BC 380460088 : JUAN, obtengo del parametro si no viene por VIEW el currency
                   var currency = (view.recordOrganizacion && view.recordOrganizacion.get('mon_csymbol'))?view.recordOrganizacion.get('mon_csymbol'):(getParametro('SYSTEMCURRENCY',false,true) || {}).codigo || ""
                   //url = Ext.String.urlAppend(url,'currency='+currency);
                   //url = Ext.String.urlAppend(url,'items='+items);
                   //url = Ext.String.urlAppend(url,'info='+info);
                  /*  
                   var form = '<form action="'+url+'" method="post" target="iframe-'+ele.id+'" id="iframe-'+ele.id+'form">'+
                                "<input type='hidden' name='items' value='"+items+"' />"+
                                "<input type='hidden' name='info' value='"+info+"' />"+
                                
                                "<input type='hidden' name='currency' value='"+currency+"' />"+
                                
                                '</form>';
                    
                   var div = document.createElement('div');
                   div.innerHTML = form;
                     
                   document.getElementsByTagName('iframe')[0].parentNode.insertBefore (div,document.getElementsByTagName('iframe')[0]);      
                   document.getElementById('iframe-'+ele.id+'form').submit()
                    
                    

                    if (frame[0]) {
                        if (frame[0].parentNode) {
                            frame[0].parentNode.insertBefore (div,document.getElementsByTagName('iframe')[0]);      
                            document.getElementById('iframe-'+ele.id+'form').submit()
                        }
                    }
                    document.getElementsByTagName('iframe')[0].parentNode.insertBefore (div,document.getElementsByTagName('iframe')[0]);      
                    document.getElementById('iframe-'+ele.id+'form').submit()   
                    */    
                                 
                    //target.load({
                    //    src: url
                    //});   
                    target.getFrame().contentDocument.body.innerHTML='<form action="'+url+'" method="post"  id="iframe-'+ele.id+'form">'+
                    "<input type='hidden' name='items' value='"+items+"' />"+
                    "<input type='hidden' name='info' value='"+info+"' />"+
                    "<input type='hidden' name='infoSearch' value='"+infoSearch+"' />"+
                    "<input type='hidden' name='currency' value='"+currency+"' />"+
                    
                    '</form>';                                    
                    target.getFrame().contentDocument.body.firstChild.submit();
                   
                } else {
                    console.log('error');
                }
            }
        
        });
        
       
        //target.setSrc(view.baseurl);


  
    

        
    }
    
});