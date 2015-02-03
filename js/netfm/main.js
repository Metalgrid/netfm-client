(function() {
    var app = angular.module("NetFM", []);

    Tab = function(path) {
        this.path == path || [];
        
        this.basename = function() {
            if (!this.path)
                return;
            return this.path[this.path.length -1];
        };
        
        this.realpath = function() {
            if (!this.path)
                return;
            this.path.slice(0,-1).join("/");
        };
    };

    app.controller('BreadcrumbController', function() {
        this.path = ['home','axtroz','projects','netfm','client'];
        this.cwd = "";

        this.chdir = function(dir) {
            console.log('switching to ' + dir);
            if (this.path.indexOf(dir) === -1) {
                this.path.push(dir);
            }
            this.cwd = dir;
        };
    });

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
        this.currentTab = this.tabs[0];
        this.addTab = function(path) {
            var tab = new Tab(path);
            this.tabs.push(tab);
        };

        this.closeTab = function(tab) {
            var tabIndex = this.tabs.indexOf(tab)
            if (tabIndex == this.currentTab)
                this.currentTab--;
            this.tabs.splice(tabIndex, 1);
        };

        this.setTab = function(tab) {
            this.currentTab = tab;
        };
    });

})();