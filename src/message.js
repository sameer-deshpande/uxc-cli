module.exports={
    //Questions
    question_for_stylesheet: 'Choose stylesheet to use',

    //CLI Texts
    manual_text: '--yes \t:\t Avoid the question prompt and create project \n'+
                    '-y \t:\t Short version of --yes \n',
    
    errors: {
        invalid_template: '%s Invalid template name',
        invalid_argument_passed: '%s Invalid option. Use uxc -h or uxc --help for valid options'

    },
    logs: {
        file_copy_success: '%s Project ready. Go through UXC-README.MD on uxc usage',
    },
    //Tasks messages
    copy_config_files: 'Copy config and README file',
    copy_stylesheet_files: 'Copy stylesheet file',

    type: {
        error: 'error',
        log: 'log',
        success: 'success',
        ERROR: 'ERROR',
        SUCCESS: 'SUCCESS'
    },
    template: {
        stylesheet: {
            SCSS: 'SCSS',
            CSS: 'CSS'
        }
    }

}