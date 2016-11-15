var dmxApp = angular.module('dmxApp', []);

dmxApp.controller('main', function ($scope) {
    $scope.pars = [
        {'address': 0, 'R': 255, 'G': 0, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 4, 'R': 0, 'G': 255, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 8, 'R': 0, 'G': 0, 'B': 255, 'type': 'led', 'selected': false},
        {'address': 12, 'R': 255, 'G': 255, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 16, 'R': 255, 'G': 255, 'B': 255, 'type': 'led', 'selected': false},
        {'address': 20, 'R': 128, 'G': 128, 'B': 128, 'type': 'led', 'selected': false},
        {'address': 24, 'R': 0, 'G': 0, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 28, 'R': 0, 'G': 0, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 32, 'R': 0, 'G': 0, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 36, 'R': 0, 'G': 0, 'B': 0, 'type': 'led', 'selected': false}
    ];
    $scope.parsPreview = [
        {'address': 0, 'R': 255, 'G': 0, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 4, 'R': 0, 'G': 255, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 8, 'R': 0, 'G': 0, 'B': 255, 'type': 'led', 'selected': false},
        {'address': 12, 'R': 255, 'G': 255, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 16, 'R': 255, 'G': 255, 'B': 255, 'type': 'led', 'selected': false},
        {'address': 20, 'R': 128, 'G': 128, 'B': 128, 'type': 'led', 'selected': false},
        {'address': 24, 'R': 0, 'G': 0, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 28, 'R': 0, 'G': 0, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 32, 'R': 0, 'G': 0, 'B': 0, 'type': 'led', 'selected': false},
        {'address': 36, 'R': 0, 'G': 0, 'B': 0, 'type': 'led', 'selected': false}
    ];

    $scope.groups = [
        {
            'label': 'Alles',
            'pars': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    ];

    $scope.scenes = [
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []},
        {'active': false, 'pars': []}
    ];

    $scope.coloredit = {
        'type': 'par-live',
        'indexes': [],
        'label': 'par 1 (live)'
    };

    $scope.colorsliders = {
        'r': 0,
        'g': 0,
        'b': 0,
        'l': 0,
        's': 0,
        'h': 0,
        'temp': 0
    };

    $scope.activeScene = 0;

    $scope.editPar = function (index, live) {
        var wasLive = $scope.coloredit.type == 'par-live';
        if (live) {
            if (!wasLive) {
                clearSelection(false);
                $scope.coloredit.indexes = [index];
                $scope.pars[index].selected = true;
            } else {
                $scope.pars[index].selected = !$scope.pars[index].selected;
                if (!$scope.pars[index].selected) {
                    $scope.coloredit.indexes.remove(index);
                    return;
                } else {
                    $scope.coloredit.indexes.push(index);
                }
            }
            $scope.coloredit.type = 'par-live';
            $scope.coloredit.label = 'par ' + (index + 1) + ' (live)';
            if ($scope.coloredit.indexes.length == 1) {
                $scope.colorsliders.r = $scope.pars[index]['R'] / 255;
                $scope.colorsliders.g = $scope.pars[index]['G'] / 255;
                $scope.colorsliders.b = $scope.pars[index]['B'] / 255;
            }
        } else {
            if (wasLive) {
                clearSelection(true);
                $scope.coloredit.indexes = [index];
                $scope.parsPreview[index].selected = true;
            } else {
                $scope.parsPreview[index].selected = !$scope.parsPreview[index].selected;
                if (!$scope.parsPreview[index].selected) {
                    $scope.coloredit.indexes.remove(index);
                    return;
                } else {
                    $scope.coloredit.indexes.push(index);
                }
            }
            $scope.coloredit.type = 'par-preview';
            $scope.coloredit.label = 'par ' + (index + 1) + ' (preview)';
            if ($scope.coloredit.indexes.length == 1) {
                $scope.colorsliders.r = $scope.parsPreview[index]['R'] / 255;
                $scope.colorsliders.g = $scope.parsPreview[index]['G'] / 255;
                $scope.colorsliders.b = $scope.parsPreview[index]['B'] / 255;
            }
        }
        $scope.coloredit.index = index;
        $scope.sliderRGB();
    };
    $scope.setPar = function () {
        if ($scope.coloredit.type == 'par-live') {
            $scope.coloredit.indexes.forEach(function (index) {
                $scope.pars[index].R = Math.floor($scope.colorsliders.r * 255);
                $scope.pars[index].G = Math.floor($scope.colorsliders.g * 255);
                $scope.pars[index].B = Math.floor($scope.colorsliders.b * 255);
            });
        } else {
            $scope.coloredit.indexes.forEach(function (index) {
                $scope.parsPreview[index].R = Math.floor($scope.colorsliders.r * 255);
                $scope.parsPreview[index].G = Math.floor($scope.colorsliders.g * 255);
                $scope.parsPreview[index].B = Math.floor($scope.colorsliders.b * 255);
            });
        }
    };
    $scope.sliderRGB = function () {
        var color = chroma($scope.colorsliders.r * 255, $scope.colorsliders.g * 255, $scope.colorsliders.b * 255);
        $scope.colorsliders.h = color.get('hsl.h');
        $scope.colorsliders.s = color.get('hsl.s');
        $scope.colorsliders.l = color.get('hsl.l');
        $scope.colorsliders.temp = color.temperature();
        $scope.setPar();
    };
    $scope.sliderHSL = function () {
        var color = chroma.hsl($scope.colorsliders.h, parseFloat($scope.colorsliders.s), parseFloat($scope.colorsliders.l));
        $scope.colorsliders.r = color.get('rgb.r') / 255;
        $scope.colorsliders.g = color.get('rgb.g') / 255;
        $scope.colorsliders.b = color.get('rgb.b') / 255;
        $scope.colorsliders.temp = color.temperature();
        $scope.setPar();
    };
    $scope.sliderTemp = function () {
        var color = chroma.temperature($scope.colorsliders.temp);
        $scope.colorsliders.r = color.get('rgb.r') / 255;
        $scope.colorsliders.g = color.get('rgb.g') / 255;
        $scope.colorsliders.b = color.get('rgb.b') / 255;
        $scope.colorsliders.h = color.get('hsl.h');
        $scope.colorsliders.s = color.get('hsl.s');
        $scope.colorsliders.l = color.get('hsl.l');
        $scope.setPar();
    };

    $scope.resetPreview = function () {
        $scope.parsPreview.forEach(function (par, index) {
            par.R = $scope.pars[index].R;
            par.G = $scope.pars[index].G;
            par.B = $scope.pars[index].B;
        });
    };
    $scope.setPreview = function (r, g, b) {
        $scope.parsPreview.forEach(function (par, index) {
            par.R = r;
            par.G = g;
            par.B = b;
        });
    };

    $scope.scenePressed = function (pressedIndex) {
        $scope.scenes.forEach(function (scene, index) {
            scene.active = index == pressedIndex;
        });
        $scope.activeScene = pressedIndex;
        console.log($scope.scenes[$scope.activeScene]);
        $scope.scenes[$scope.activeScene].pars.forEach(function (par, index) {
            $scope.parsPreview[index].R = par.R;
            $scope.parsPreview[index].G = par.G;
            $scope.parsPreview[index].B = par.B;
        });
    };

    $scope.programScene = function (live) {
        if (live) {
            $scope.scenes[$scope.activeScene].pars = jQuery.extend(true, [], $scope.pars);
        } else {
            $scope.scenes[$scope.activeScene].pars = jQuery.extend(true, [], $scope.parsPreview);
        }
    };

    function updateSelection() {
        var list = $scope.parsPreview;
        var otherList = $scope.pars;
        if ($scope.coloredit.type == 'par-live') {
            list = $scope.pars;
            otherList = $scope.parsPreview;
        }
        console.log($scope.coloredit.type);
        list.forEach(function (par, index) {
            par.selected = $scope.coloredit.indexes.indexOf(index) > -1;
        });
        otherList.forEach(function (par, index) {
            par.selected = false;
        })
    }

    function clearSelection(live) {
        var list = $scope.parsPreview;
        if (live) {
            list = $scope.pars;
        }
        list.forEach(function (par, index) {
            par.selected = false;
        });
    }
});

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
