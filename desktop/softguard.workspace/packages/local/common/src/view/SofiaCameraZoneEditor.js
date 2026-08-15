Ext.define('Common.view.SofiaCameraZoneEditor', {
    extend: 'Ext.container.Container',
    alias: 'widget.sofiacamerazoneeditor',
    cls: 'sofia-camera-zone-editor',
    config: {
        placeholderText: 'Sin imagen disponible',
        placeholderColor: '#636363'
    },
    layout: 'fit',
    focusable: false,

    initComponent: function() {
        var me = this;
        me.currentPolygon = [];
        me.snapshotUrl = null;
        me.surfaceReady = false;
        me.draggingVertexIndex = null;
        me.vertexRadius = 6;
        me.surfaceSize = { width: 640, height: 360 };
        me.naturalSize = null;

        me.items = [{
            xtype: 'component',
            itemId: 'surface',
            listeners: {
                afterrender: me.onSurfaceRendered,
                scope: me
            }
        }];

        me.listeners = me.listeners || {};
        me.listeners.resize = me.onHostResize;

        me.callParent(arguments);
    },

    onSurfaceRendered: function(component) {
        var el = component.getEl();
        if (!el) {
            return;
        }

        el.setStyle({
            position: 'relative',
            overflow: 'hidden'
        });

        var wrapper = Ext.DomHelper.append(el, {
            tag: 'div',
            cls: 'zone-wrapper'
        }, true);

        wrapper.setStyle({
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: this.getPlaceholderColor()
        });

        var image = Ext.DomHelper.append(wrapper, {
            tag: 'img',
            cls: 'zone-image',
            src: '',
            draggable: false
        }, true);
        image.setStyle({
            display: 'none',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            userSelect: 'none',
            pointerEvents: 'none'
        });

        var canvas = Ext.DomHelper.append(wrapper, {
            tag: 'canvas',
            cls: 'zone-canvas'
        }, true);
        canvas.setStyle({
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            cursor: 'crosshair'
        });

        var placeholder = Ext.DomHelper.append(wrapper, {
            tag: 'div',
            cls: 'zone-placeholder',
            html: '<span>' + Ext.String.htmlEncode(this.getPlaceholderText()) + '</span>'
        }, true);
        placeholder.setStyle({
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '16px',
            padding: '12px',
            textAlign: 'center',
            pointerEvents: 'none',
            backgroundColor: 'rgba(0,0,0,0.1)'
        });

        this.wrapperEl = wrapper;
        this.imageEl = image;
        this.canvasEl = canvas;
        this.placeholderEl = placeholder;
        this.canvasCtx = canvas.dom.getContext('2d');

        this.bindCanvasEvents();
        this.surfaceReady = true;
        this.refreshSnapshot();
        this.syncSurfaceSize();
        this.applyDisabledStyles();
    },

    bindCanvasEvents: function() {
        if (!this.canvasEl) {
            return;
        }
        var scope = this;
        this.canvasEl.on({
            scope: this,
            pointerdown: this.onPointerDown,
            pointermove: this.onPointerMove,
            pointerup: this.onPointerUp,
            pointerleave: this.onPointerLeave,
            dblclick: this.onDoubleClick,
            contextmenu: function(e) {
                e.preventDefault();
            }
        });
        Ext.getDoc().on('pointerup', function(e) {
            if (scope.draggingVertexIndex !== null) {
                scope.onPointerUp(e);
            }
        });
    },

    onHostResize: function() {
        this.syncSurfaceSize();
    },

    onPointerDown: function(e) {
        if (this.isDisabled()) {
            return;
        }
        e.stopEvent();
        var position = this.eventToCanvasPoint(e);
        if (!position) {
            return;
        }
        var vertexIndex = this.findVertexIndex(position.x, position.y);
        if (vertexIndex !== -1) {
            this.draggingVertexIndex = vertexIndex;
            return;
        }
        this.addVertex(position);
    },

    onPointerMove: function(e) {
        if (this.draggingVertexIndex === null || this.isDisabled()) {
            return;
        }
        e.stopEvent();
        var position = this.eventToCanvasPoint(e);
        if (!position) {
            return;
        }
        this.updateVertex(this.draggingVertexIndex, position);
    },

    onPointerUp: function(e) {
        if (this.draggingVertexIndex === null) {
            return;
        }
        e.stopEvent();
        this.draggingVertexIndex = null;
    },

    onPointerLeave: function() {
        if (this.draggingVertexIndex !== null) {
            this.draggingVertexIndex = null;
        }
    },

    onDoubleClick: function(e) {
        if (this.isDisabled()) {
            return;
        }
        e.stopEvent();
        var position = this.eventToCanvasPoint(e);
        if (!position) {
            return;
        }
        var index = this.findVertexIndex(position.x, position.y);
        if (index !== -1) {
            this.removeVertex(index);
        }
    },

    addVertex: function(position) {
        var normalized = this.toNormalized(position);
        this.currentPolygon.push(normalized);
        this.redraw();
        this.firePolygonChanged();
    },

    updateVertex: function(index, position) {
        if (index < 0 || index >= this.currentPolygon.length) {
            return;
        }
        this.currentPolygon[index] = this.toNormalized(position);
        this.redraw();
        this.firePolygonChanged();
    },

    removeVertex: function(index) {
        if (index < 0 || index >= this.currentPolygon.length) {
            return;
        }
        this.currentPolygon.splice(index, 1);
        this.redraw();
        this.firePolygonChanged();
    },

    resetPolygon: function() {
        this.currentPolygon = [];
        this.redraw();
        this.firePolygonChanged();
    },

    firePolygonChanged: function() {
        this.fireEvent('polygonchanged', this, this.getPolygon());
    },

    eventToCanvasPoint: function(e) {
        if (!this.canvasEl) {
            return null;
        }
        var canvasXY = this.canvasEl.getXY();
        if (!canvasXY) {
            return null;
        }
        var x = e.getX() - canvasXY[0];
        var y = e.getY() - canvasXY[1];
        return { x: x, y: y };
    },

    findVertexIndex: function(x, y) {
        var radius = this.vertexRadius + 2;
        for (var i = 0; i < this.currentPolygon.length; i++) {
            var pixel = this.toPixels(this.currentPolygon[i]);
            var dx = pixel.x - x;
            var dy = pixel.y - y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= radius) {
                return i;
            }
        }
        return -1;
    },

    toPixels: function(point) {
        var width = this.surfaceSize.width;
        var height = this.surfaceSize.height;
        return {
            x: point[0] * width,
            y: point[1] * height
        };
    },

    toNormalized: function(position) {
        var width = this.surfaceSize.width || 1;
        var height = this.surfaceSize.height || 1;
        var x = Ext.Number.constrain(position.x / width, 0, 1);
        var y = Ext.Number.constrain(position.y / height, 0, 1);
        return [x, y];
    },

    redraw: function() {
        if (!this.canvasCtx) {
            return;
        }

        var ctx = this.canvasCtx;
        var width = this.surfaceSize.width;
        var height = this.surfaceSize.height;
        ctx.clearRect(0, 0, width, height);

        if (!this.currentPolygon.length) {
            this.drawCrosshair();
            return;
        }

        ctx.save();
        ctx.beginPath();
        Ext.Array.forEach(this.currentPolygon, function(point, index) {
            var pixel = this.toPixels(point);
            if (index === 0) {
                ctx.moveTo(pixel.x, pixel.y);
            } else {
                ctx.lineTo(pixel.x, pixel.y);
            }
        }, this);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 150, 255, 0.25)';
        ctx.strokeStyle = 'rgba(0, 150, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        this.drawVertices();
    },

    drawVertices: function() {
        var ctx = this.canvasCtx;
        var radius = this.vertexRadius;
        Ext.Array.forEach(this.currentPolygon, function(point) {
            var pixel = this.toPixels(point);
            ctx.beginPath();
            ctx.arc(pixel.x, pixel.y, radius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = '#0096ff';
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
        }, this);
    },

    drawCrosshair: function() {
        var ctx = this.canvasCtx;
        var width = this.surfaceSize.width;
        var height = this.surfaceSize.height;
        var centerX = width / 2;
        var centerY = height / 2;
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(centerX, 10);
        ctx.lineTo(centerX, height - 10);
        ctx.moveTo(10, centerY);
        ctx.lineTo(width - 10, centerY);
        ctx.stroke();
        ctx.restore();
    },

    syncSurfaceSize: function() {
        if (!this.surfaceReady || !this.canvasEl) {
            return;
        }

        var availableWidth = 0;
        if (this.wrapperEl && this.wrapperEl.dom) {
            availableWidth = this.wrapperEl.getWidth(true);
        }
        if (!availableWidth && this.el) {
            availableWidth = this.el.getWidth(true);
        }
        if (!availableWidth && this.ownerCt) {
            var ownerEl = this.ownerCt.body || this.ownerCt.el;
            if (ownerEl) {
                availableWidth = ownerEl.getWidth(true);
            }
        }
        if (!availableWidth) {
            availableWidth = this.getWidth();
        }
        if (!availableWidth) {
            availableWidth = this.surfaceSize.width;
        }

        var maxWidth = Math.max(320, Math.min(availableWidth, 900));

        var aspectRatio = this.getAspectRatio();
        var height = Math.round(maxWidth / aspectRatio);

        this.surfaceSize = { width: maxWidth, height: height };

        this.canvasEl.setSize(maxWidth, height);
        this.canvasEl.dom.width = maxWidth;
        this.canvasEl.dom.height = height;

        if (this.imageEl) {
            this.imageEl.setSize(maxWidth, height);
        }
        if (this.placeholderEl) {
            this.placeholderEl.setSize(maxWidth, height);
        }
        if (this.wrapperEl) {
            this.wrapperEl.setSize(maxWidth, height);
        }
        this.setSize(maxWidth, height);
        this.redraw();
    },

    getAspectRatio: function() {
        if (this.naturalSize && this.naturalSize.width && this.naturalSize.height) {
            return this.naturalSize.width / this.naturalSize.height;
        }
        return 16 / 9;
    },

    refreshSnapshot: function() {
        if (!this.surfaceReady) {
            return;
        }
        var url = this.snapshotUrl;
        if (Ext.isEmpty(url)) {
            this.showPlaceholder();
            return;
        }
        var imageDom = this.imageEl ? this.imageEl.dom : null;
        if (!imageDom) {
            return;
        }
        var me = this;
        imageDom.onload = function() {
            me.onImageLoaded(this);
        };
        imageDom.onerror = function() {
            me.onImageError();
        };
        imageDom.src = url;
    },

    onImageLoaded: function(img) {
        this.naturalSize = {
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height
        };
        if (this.imageEl) {
            this.imageEl.setStyle('display', 'block');
        }
        if (this.placeholderEl) {
            this.placeholderEl.setStyle('display', 'none');
        }
        this.syncSurfaceSize();
    },

    onImageError: function() {
        this.naturalSize = null;
        this.showPlaceholder();
    },

    showPlaceholder: function() {
        if (this.imageEl) {
            this.imageEl.setStyle('display', 'none');
            this.imageEl.dom.src = '';
        }
        if (this.placeholderEl) {
            this.placeholderEl.setStyle('display', 'flex');
        }
        this.syncSurfaceSize();
    },

    setSnapshot: function(url) {
        this.snapshotUrl = url || null;
        if (this.surfaceReady) {
            this.refreshSnapshot();
        }
    },

    getSnapshot: function() {
        return this.snapshotUrl || null;
    },

    setPolygon: function(polygon) {
        if (!Ext.isArray(polygon)) {
            this.currentPolygon = [];
        } else {
            this.currentPolygon = Ext.Array.map(polygon, function(point) {
                if (!Ext.isArray(point) || point.length < 2) {
                    return [0, 0];
                }
                var x = Ext.Number.constrain(parseFloat(point[0]) || 0, 0, 1);
                var y = Ext.Number.constrain(parseFloat(point[1]) || 0, 0, 1);
                return [x, y];
            });
        }
        this.redraw();
    },

    getPolygon: function() {
        return Ext.Array.clone(this.currentPolygon);
    },

    setDisabled: function(disabled) {
        this.callParent([disabled]);
        this.applyDisabledStyles();
    },

    applyDisabledStyles: function() {
        if (!this.canvasEl) {
            return;
        }
        var disabled = this.isDisabled();
        this.canvasEl.setStyle('opacity', disabled ? '0.35' : '1');
        this.canvasEl.setStyle('pointerEvents', disabled ? 'none' : 'auto');
        if (this.placeholderEl) {
            this.placeholderEl.setStyle('opacity', disabled ? '0.6' : '1');
        }
    }
});
