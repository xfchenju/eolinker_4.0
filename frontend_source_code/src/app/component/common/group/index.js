(function() {
    'use strict';
    /**
     * @name eolinker open source，eolinker开源版本
     * @link https://www.eolinker.com
     * @package eolinker
     * @author www.eolinker.com 广州银云信息科技有限公司 2015-2018

     * eolinker，业内领先的Api接口管理及测试平台，为您提供最专业便捷的在线接口管理、测试、维护以及各类性能测试方案，帮助您高效开发、安全协作。
     * 如在使用的过程中有任何问题，可通过[图片]http://help.eolinker.com寻求帮助
     *
     * 注意！eolinker开源版本遵循GPL V3开源协议，仅供用户下载试用，禁止“一切公开使用于商业用途”或者“以eoLinker开源版本为基础而开发的二次版本”在互联网上流通。
     * 注意！一经发现，我们将立刻启用法律程序进行维权。
     * 再次感谢您的使用，希望我们能够共同维护国内的互联网开源文明和正常商业秩序。
     *
     * @description 分组/表组件
     * @extend {object} authorityObject 权限类{edit}
     * @extend {object} funObject 第一部分功能集类{showVar,btnGroupList{edit:{fun,key,class,showable,icon,tips},sort:{default,cancel,confirm:{fun,key,showable,class,icon,tips}}}}
     * @extend {object} sortObject 排序信息{sortable,groupForm}
     * @extend {object} mainObject 主类{level,extend,query,baseInfo:{name,id,child,fun:{edit,delete},parentFun:{addChild}}}
     */
    angular.module('eolinker')
        .component('groupCommonComponent', {
            templateUrl: 'app/component/common/group/index.html',
            controller: indexController,
            bindings: {
                authorityObject: '<',
                funObject: '<',
                sortObject: '<',
                mainObject: '<',
                list: '<'
            }
        })

    indexController.$inject = ['$scope'];

    function indexController($scope) {
        var vm = this;
        vm.data = {
            info: {
                sortForm: {
                    containment: '.group-form-ul',
                    child: {
                        containment: '.child-group-form-ul'
                    },
                    grandson:{
                        containment:'.third-level-group-form-ul'
                    }
                }
            },
            fun: {
                more: null,
                common: null
            }
        }

        /**
         * 单项列更多操作
         * @param  {object} arg 传参object{item:单列表项,$event:dom文本}
         */
        vm.data.fun.more = function(arg) {
            arg.$event.stopPropagation();
            arg.item.listIsClick = true;
        }

        /**
         * @description 统筹绑定调用页面列表功能单击函数
         * @param {extend} obejct 方式值
         * @param {object} arg 共用体变量，后根据传值函数回调方法
         */
        vm.data.fun.common = function(extend, arg) {
            if(!extend)return;
            var template = {
                params: arg
            }
            switch (typeof(extend.params)) {
                case 'string':
                    {
                        return eval('extend.fun(' + extend.params + ')');
                        break;
                    }
                default:
                    {
                        for (var key in extend.params) {
                            if (extend.params[key] == null) {
                                template.params[key] = arg[key];
                            } else {
                                template.params[key] = extend.params[key];
                            }
                        }
                        return extend.fun(template.params);
                        break;
                    }
            }

        }
    }
})();
