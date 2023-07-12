import * as $ from 'jquery'
function analytic_create(): object {
    let counter = 0
    let destroy:boolean = false
    const listener = (): number => counter++
    $(document).on('click', listener)
    return {
        destroy() {
            $(document).off('click', listener)
            destroy = true
        },
        getClicks(){
            if (destroy) {
                return `Analytics_destroy. Total clicks = ${counter}`
            }
            return counter
        }
    }
}
window['analytics'] = analytic_create()