var CredentialsAssistant = Class.create(BaseAssistant, {
  initialize: function($super, credentials, showMessage) {
    $super()
    this.credentials = credentials
    this.showMessage = showMessage
    this.button = {buttonLabel: "Login"}
  },

  setup: function($super) {
    $super()
    this.setupWidgets()
    this.setupListeners()
  },

  activate: function($super) {
    $super()
    this.controller.get("password").mojo.setConsumesEnterKey(false)
    this.controller.get("login-failure")[this.showMessage ? "show" : "hide"]()
  },

  cleanup: function($super) {
    $super()
    this.cleanupListeners()
  },

  setupWidgets: function() {
    this.controller.setupWidget("username", {modelProperty: "username", changeOnKeyPress: true, autoFocus: true, textCase: Mojo.Widget.steModeLowerCase}, this.credentials)
    this.controller.setupWidget("password", {modelProperty: "password", changeOnKeyPress: true}, this.credentials)
    this.controller.setupWidget("login", {type: Mojo.Widget.activityButton}, this.button)
  },

  setupListeners: function() {
    this.propertyChanged = this.propertyChanged.bind(this)
    this.login = this.login.bind(this)

		this.controller.listen("password", Mojo.Event.propertyChange, this.propertyChanged)
    this.controller.listen("login", Mojo.Event.tap, this.login)
  },

  cleanupListeners: function() {
		this.controller.stopListening("password", Mojo.Event.propertyChange, this.propertyChanged)
    this.controller.stopListening("login", Mojo.Event.tap, this.login)
  },

  propertyChanged: function(event) {
    if(Mojo.Char.enter === event.originalEvent.keyCode) {
      this.login()
    }
  },

  login: function() {
    this.controller.stageController.swapScene("login", this.credentials)
  }
})