app.filter "appDate", ->
    (input) ->
        if moment(input).isValid()
            if moment.locale() is "zh-cn"
                return moment(input).format("YYYY-M-D")
            return moment(input).format("l")
        return ""
        
app.filter "appDateTime", ->
    (input) ->
        if moment(input).isValid()
            if moment.locale() is "zh-cn"
                return moment(input).format("YYYY-M-D HH:mm:ss")
            return moment(input).format("lll")
        return ""
        
app.filter "appFullDateTime", ->
    (input) ->
        if moment(input).isValid()
            if moment.locale() is "zh-cn"
                return moment(input).format("llll")
            return moment(input).format("llll")
        return ""