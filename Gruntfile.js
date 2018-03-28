module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.author %>:<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                ASCIIOnly: true,
                screwIE8: false
            },

            build: {
                files:[/*{
                    src: 'src/supplydetailcontrolv2.js',
                    dest: 'dist/supplydetailcontrolv2.min.js'
                },{
                    src:'src/hc.jqwebuploader.core.js',
                    dest:'dist/hc.jqwebuploader.core.js'
                },{
                    src:'src/wz_h5.js',
                    dest:'dist/wz_h5.min.js'
                },{
                    src:'src/wz_introduce.js',
                    dest:'dist/wz_introduce.min.js'
                },{
                    src:'src/hc.kindeditor.js',
                    dest:'dist/hc.kindeditor.min.js'
                },{
                    src:'src/a.js',
                    dest:'dist/a.min.js'
                },*/{
                    src:'src/wz_tionalpage.js',
                    dest:'dist/wz_tionalpage.min.js'
                },{
                    src:'src/hc.p4pEchartsMicro.js',
                    dest:'dist/hc.p4pEchartsMicro.min.js'
                }]
            }

        }
    });

    /**
     * 加载任务;
     */
    grunt.loadNpmTasks("grunt-contrib-uglify");
    /**
     * 定义默认被执行的任务列表
     */
    grunt.registerTask('default', ['uglify']);
};
