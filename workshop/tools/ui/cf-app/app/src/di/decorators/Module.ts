import * as React from 'react';
import { ModuleOptions } from '../interfaces/ModuleOptions';
import { createModuleComponent } from '../module-service';
import { Module as ModuleClass } from '../models/Module';
import { Component } from 'react';

export function Module(options: ModuleOptions = {}) {
    return (target: any) => {

        const moduleComponent = createModuleComponent({
            getContainer(this: Component) {
                // tslint:disable-next-line:no-invalid-this
                return ModuleClass.getModule(this.constructor).getInternalContainer(this.context);
            },
            getChild(this: Component) {
                // tslint:disable-next-line:no-invalid-this
                return React.createElement(target, this.props);
            },
        });

        ModuleClass.setModule(moduleComponent, new ModuleClass(moduleComponent, options));

        return moduleComponent as any;
    };
}
