(function() {
    var app = angular.module("NetFM", []);

    var Tab = function(path) {
        this.path = path || "";
        this.breadcrumb = this.path.split("/");
        
        // Remove blank elements generated from absolute paths
        for (var ind = this.breadcrumb.indexOf(""); ind != -1;ind = this.breadcrumb.indexOf("")) {
            this.breadcrumb.splice(ind, 1);
        }

        this.basename = function() {
            if (!this.path)
                return;
            return this.path[this.breadcrumb.length -1];
        };
        
        this.realpath = function() {
            if (!this.path)
                return;
            this.path.slice(0,-1).join("/");
        };
        
        this.content = [
                new Entry('Downloads', 'folder'),
                new Entry('Music', 'folder'),
                new Entry('public_html', 'folder')
            ];
    };
    
    var Entry = function(name, type) {
        this.name = name || "";
        this.type = type || "unknown";
    };

    app.controller('BookmarkController', function() {
        this.bookmarks = ['home', 'www'];
        this.toggled = this.toggled || false;

        this.toggle = function() {
            this.toggled = !this.toggled;
        };

        this.addBookmark = function(bookmark) {
            if (this.bookmarks.indexOf(bookmark)===-1) {
                this.bookmarks.push(bookmark);
            }
        };
    });

    app.controller('ViewController', function() {
        this.tabs = [(new Tab('/'))];
        tabs = this.tabs
        this.currentTab = this.tabs[0];
        
        this.addTab = function(path) {
            if (!path)
                path = this.currentTab.path
            var tab = new Tab(path);
            this.tabs.push(tab);
        };

        this.closeTab = function(tab) {
            var tabIndex = this.tabs.indexOf(tab);
            this.tabs.splice(tabIndex, 1);
            if (tab == this.currentTab)
                this.currentTab = this.tabs[0];
        };

        this.setTab = function(tab) {
            this.currentTab = tab;
        };
    });

})();