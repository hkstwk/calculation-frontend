# CalculationFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```plantuml
@startuml
title Angular → Docker → NGINX Deployment Pipeline

actor Developer

rectangle "Git Repository" as Git {
component "Angular Source\n(TypeScript, HTML, SCSS)" as Src
component "Dockerfile\n(Multi‑stage)" as Dockerfile
component "nginx.conf" as NginxConf
}

Developer --> Src : Commit + Push

rectangle "CI/CD Pipeline" as CI {
component "Checkout Code" as Checkout
component "Install Node Modules\nnpm ci" as NpmCI
component "Angular Build\nng build --configuration production" as NgBuild
component "Docker Build\nmulti‑stage" as DockerBuild
component "Docker Tag & Push" as DockerPush
}

Git --> Checkout
Checkout --> NpmCI
NpmCI --> NgBuild
NgBuild --> DockerBuild : COPY dist/*/browser
DockerBuild --> DockerPush

rectangle "Container Registry" as Registry {
component "my-angular-app:latest" as Image
}

DockerPush --> Image

rectangle "Runtime Environment" as Runtime {
node "NGINX Container" as Nginx {
component "/usr/share/nginx/html\n(Angular build output)" as Html
component "/etc/nginx/nginx.conf" as Conf
}
}

Image --> Nginx : docker pull
Nginx --> Html : Serve static files
Nginx --> Conf : SPA routing + caching

@enduml
```
