export enum ModuleProperties {
    Controller   = "controllers",
    Repositories = "repositories",
    Service      = "services",
    Modules      = "modules",
    Routes       = "routes",
    Prefix       = "prefix",
}

export enum MiddlewareProperties {
    ValidateProperties   = "ValidateProperties",
}

export enum HTTPMethods {
    Get   = "get",
    Post  = "post",
    Put   = "put",
    Patch = "patch",
}

export enum EmailStatus {
    Create = "create",
    Send   = "send",
    Failed = "failed",
}