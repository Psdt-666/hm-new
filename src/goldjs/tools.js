const tools = {
    throttle(fn, t) {
        const falg = fn.name + 'falg'
        this[falg] = true
        return () => {
            if (this[falg]) {
                this[falg] = false
                fn()
                setTimeout(() => {
                    this[falg] = true
                }, t);
            }
        }
    },

    anti_shake(fn, t) {
        const time = fn.name + 'time'
        this[time] = ''
        return () => {
            clearTimeout(this[time])
            this[time] = setTimeout(() => {
                fn()
            }, t);
        }
    }

}

export default tools


