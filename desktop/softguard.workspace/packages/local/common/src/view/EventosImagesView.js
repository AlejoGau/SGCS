//MIGRADO2024
Ext.define('Common.view.EventosImagesView',{ 
    extend: 'Ext.view.View',
    alias: ['widget.eventosimagesgridview','widget.eventosimagesview'],
    itemId: 'images-view',
    title : 'Imagenes',
    autoScroll: true,
    emptyText: 'Sin imágenes para mostrar',
    tpl: [
        '<tpl for=".">',
            
            '<div class="thumb-wrap" id="{id}-{name:stripTags}">',
                '<br/>',
                '<div>'+getLocale('Usuario')+': {usu_cnombre}</div>',
                '<div>{cod_cdescripcion}</div>',
                '<div>{cue_cnombre}</div>',
                '<div>{gri_dfechahora}</div>',
                '<div class="thumbW"><img src="{url}" title="{dateString}" alt="{dateString}" style="width: 100%"></div>',
                
            '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    ],
    //width="400"
    prepareData: function(data) {
        var folder = data.gri_ccarpeta;
        var filename = data.gri_carchivo;
        var url = '/rest/upload/get?search=softguardMiscFile&download=false&path=\\video\\'+folder+'&filename='+filename+'.jpg';
        Ext.apply(data, {
            id: this.id,
            name: filename,
            url: url,
            dateString: data.gri_dfechahora,
            cod_cdescripcion: data.cod_cdescripcion,
            cue_cnombre: data.cue_cnombre,
            usu_cnombre: data.usu_cnombre,
            gri_dfechahora: data.gri_dfechahora
        });
        return data;
    }
});  // cierro define