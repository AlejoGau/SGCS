Ext.define('WebRemoto.view.ChatDataView', {
    extend : 'Ext.view.View',
    alias : ['widget.chatdataview'],
    emptyText: 'sin mensajes',
    autoScroll: true,
    cls:'chatdataview_cls',
    tpl: [
          '<tpl for=".">',
            '<div class="msg {side}-msg">',
                //'<div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"></div>',
                '<div class="msg-bubble">',
                    '<div class="msg-info">',
                        '<div class="msg-info-name">{Name}</div>',
                        '<div class="msg-info-time">{Date:date("H:i")}</div>',
                    '</div>',
                    '<div class="msg-text">',
                        '{Message}',
                    '</div>',
                '</div>',
            '</div>',
          '</tpl>'
    ],
     itemSelector: '.msg',
    prepareData: function(data) {
        console.log(data);
        return data;
    }
});