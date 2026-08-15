//MIGRADO2024
Ext.define( 'Common.view.OrdenServTecView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ordenservtecview',
    //requires: 'Slbf.ux.uxiframe',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border: false,
            width: '100%'
        }
    ],
    activeHelp: true,
    initComponent: function() {
        this.callParent();
        var toolbar = Ext.create( 'Ext.toolbar.Toolbar', {
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'icon-printer',
                    handler: function( button ) {
                        var iframe = button.up( 'ordenservtecview' ).down( '#Iframe' );
                        var url = iframe.src;
                        fetch(url)
                        .then(function (response) {
                            return response.text();
                        })
                        .then(function (body) { 
                            printHTMLContent(body);

                        });
                        /*
                        var ele = iframe.getEl();
                        var vect = ele.id.split("-");
                        var id = 'uxiframe-' + vect[1] + '-iframeEl';
                        var frame = document.getElementById(id);//.contentWindow.printMe();
                        //var iframeContent = iframe.getEl().dom.contentWindow.document.body.innerHTML;

                        var printContainer = document.createElement('div');
                        printContainer.innerHTML = frame.ownerDocument.body.innerHTML;
                        printContainer.style.position = 'absolute';
                        printContainer.style.left = '-9999px';
                        document.body.appendChild(printContainer);
                        window.print();
                        printContainer.parentNode.removeChild(printContainer);
                        */

                        //frame.ownerDocument.printMe();
                    }
                }, {
                    text: 'Enviar por mail',
                    iconCls: 'icon-email',
                    itemId: 'mail'
                }, {
                    text: 'Zonas y Usuarios',
                    //iconCls : 'icon-printer',
                    handler: function( button ) {
                        var view = button.up( 'ordenservtecview' );
                        var record = view.record;
                        var token = Ext.util.Cookies.get( 'OAuth_Token' );
                        var iframe = Ext.widget( 'uxiframe', {
                            src: '/handler/InformeCuentaHTML?token=' + token + '&Dealer=' + record.get( 'cue_clinea' ) + '&CuentaDesde=' + record.get( 'cue_ncuenta' ) + '&CuentaHasta=' + record.get( 'cue_ncuenta' ) + '&chkusuarioxx=true&chkzonas=true&hidetipo=true&hidelista=true',
                            border: false,
                            tbar: [
                                {
                                    text: 'Imprimir',
                                    iconCls: 'icon-printer',
                                    handler: function( button ) {
                                        var iframe = button.up( 'uxiframe' );
                                        var ele = iframe.getEl();
                                        document.getElementById( 'iframe-' + ele.id ).contentWindow.printMe();
                                    }
                                }
                            ],
                            width: '100%'
                        });
                        var win = Ext.create( 'Ext.Window', {
                            autoShow: true,
                            layout: 'fit',
                            title: 'Usuarios y zonas',
                            translate: false,
                            closeAction: 'hide',
                            border: true,
                            modal: false,
                            width: 800,
                            height: 600,
                            view: view,
                            items: iframe,
                            maximized: false
                        });
                    }
                }
            ]// cierro items
        });
        this.addDocked( toolbar );
    }
});