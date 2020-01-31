# Toast



Installation

    yarn add @happeouikit/toast

or 

    npm install --save @happeouikit/toast


### Usage

```
// First include the container in the apps root component

// App.js

import {ToastContainer} from '@happeouikit/toast';

...

render () {
    <div> /* Main app */ </div>
    <ToastContainer/>
}

// Then call toast methods inside any other components

// Component.js

import {toast} from '@happeouikit/toast';
...

const someMethod = () => {
    toast.success({message: "Success message"})
}

```
