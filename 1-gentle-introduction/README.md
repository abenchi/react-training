# React Basic Concepts Jump-start

This section introduces the concept of components in React and the underlying details behind. We'll use a [JavaScript playground](https://codesandbox.io/) to practice and play with the given snippets.

## Setup
1. Go to the following [link](https://codesandbox.io/s/vanilla)
2. Clear the content of the file _index.js_
3. Import the React library by adding the following two lines
``` JavaScript
import React from 'react'
import ReactDOM from 'react-dom'
```

## Hello React !!!
Our _'Hello World !!!'_ program for React is the following
``` JavaScript
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  React.createElement("div", null, "Hello React !!!"),
  document.getElementById("app")
)
```
It outputs the message _'Hello React !!!'_ inside a _div_ tag in the browser, notice that we did call specific React API functions (_render_ and _createElement_) to attach this _div_ to the DOM.
``` HTML
<!DOCTYPE html>
<html>
    <head>
        <title>React Playground</title>
        <meta charset="UTF-8" />
    </head>

    <body>
        <div id="app"></div><!-- This is where we mount our components -->
        <script src="src/index.js"></script><!-- This is where the React code get called -->
    </body>
</html>
```
The call to
``` JavaScript
document.getElementById("app")
```
did select the tag with identifier _app_ inside the above HTML page (generated by the playground) and invoking _ReactDOM.render_ will instruct the Virtual DOM to attach the element _div_ with the message to the page tree
``` JavaScript
React.createElement("div", null, "Hello React !!!")
```
In a nutshell, we have
``` JavaScript
// the element can be any simple or composite element
// the mount point can be the root of the DOM
ReactDOM.render(element, mountPoint)
```

## The React DOM API
The _React DOM API_ allows us to describe our UI using a _declarative_ style
``` JavaScript
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  React.createElement(
    "div",
    null,
    "Simple Form",
    React.createElement("input", null),
    React.createElement(
      "button",
      {type: "submit"},
      "submit"
    )
  ),
  document.getElementById("app")
)
```
the above code generates a dummy form where we have an input text and a submit button inside the parent _div_; notice how the _React.createElement_ did encapsulate the other parts of the page each declared by the same call _React.createElement_. The _createElement_ function has the following signature
``` JavaScript
// content can be a dynamic set of simple or composite elements
createElement(name, attributes, ...content)
```

:information_source: From the exercise, you can see that using the React DOM API to describe the UI is very cumbersome and hard to read, but, _Good News_, we can develop React code without using its DOM API and the alternative is _JSX_.

**Practice Exercise**: create a dummy simple page consisting of:
- a main title
- two separated forms each with a title, input text and reset button
- two buttons for submit and cancel

## JSX
JSX is a syntax that allows writing HTML inside the JavaScript code in a tag based form rather than a text input.  
Code written in JSX is easier to read and decompose into components than a code written using the verbose form seen in the previous section.
The [Babel compiler](https://babeljs.io/) is used to convert the JSX into the corresponding JavaScript code for the React DOM API.
In practice, the _'Hello World !!!'_ example will be
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>Hello React !!!</div>,
  document.getElementById("app")
)
```
Notice how we did go from the verbose React DOM API to the condensed JSX. Let's look at the more extensive example of the simple form.
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>Simple Form
      <input />
      <button type="submit">submit</button>
  </div>,
  document.getElementById("app")
)
```

:warning: JSX is not exact HTML, it didn't mimic all its syntax, as an obvious example _className_ (used to style elements) is used in JSX instead of _class_ for HTML
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div className="message">Hello React !!!</div>,
  document.getElementById("app")
)
```

:information_source: when we use JSX syntax, JavaScript files can have the extension _.jsx_, some projects using TypeScript (out of scope) may have the _.tsx_ extension, meaning that the JSX code can be translated into TypeScript.

:information_source: to see how JSX is converted in terms of the React DOM API, take a look at the following [link](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABAcwE4FN2zMgFASkQG8AoRRDKEVJAHgBMYA3APgAl0AbTuRAJXQBDaIgCE42gHpGrANwkAvkA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2016%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.2).

**Practice Exercise**: rewrite the previous exercise using the JSX syntax.

## Props and the Functional React Component
So far we mentioned frequently the term _Component_ without showing a concrete example, this was done in purpose because of the _step-by-step_ nature of this training. So the time has come for the revelation, here's the simplest React component that can exist in nature:
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Greeting() {
  return <div>Hello React !!!</div>
}

ReactDOM.render(<Greeting />, document.getElementById("app"))
```
As simple as that, a component can be a function that returns a part of the DOM (by means of JSX or React DOM API), and besides that, can encapsulate other components as shown below with the the simple form example
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

function SimpleInput() {
  return (
    <React.Fragment>
      <input />
      <button type="submit">submit</button>
    </React.Fragment>
  );
}

function SimpleForm() {
  return (
    <div>Simple Form
      <SimpleInput />
    </div>
  );
}

const mountPoint = document.getElementById("app");

ReactDOM.render(<SimpleForm />, mountPoint);
```
The tag _React.Fragment_ is used to group multiple elements when we can't use the _div_ tag (in case of tables for example).

**Practice Exercise**: rewrite the previous exercise using components as shown by the code above.

At this point, those components are static; they spit crude HTML; so what if we want to make their content _dynamic_ ? easy, our components are functions (for the moment) and functions can accept arguments. In the React vocabulary, we call those function's _arguments_ by the term _props_ and they are in object form
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Greeting(props) {
  return <div>Hello {props.subject} !!!</div>
}

const mountPoint = document.getElementById("app");

ReactDOM.render(<Greeting subject="React"/>, mountPoint);
```
Props are used also to pass data between components
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

function SimpleInput(props) {
  return (
    <React.Fragment>
      <input placeholder={props.defaultText}/>
      <button type="submit">submit</button>
    </React.Fragment>
  );
}

function SimpleForm(props) {
  const { title } = props;
  return (
    <div>{title}
      <SimpleInput defaultText={title}/>
    </div>
  );
}

const mountPoint = document.getElementById("app");

ReactDOM.render(<SimpleForm title="Simple Form"/>, mountPoint);
```
As a matter of conclusion for this section, we came to know how to declare our interface using _Functional Components_
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Child1(props) {
  return <div>{props.value1}</div>;
}

function Child2(props) {
  return <input placeholder={props.value2}/>;
}

function Child3(props) {
  return <button>{props.value3}</button>;
}

function MainComponent(props) {
  const { value1, value2, value3 } = props;
  return (
    <React.Fragment>
      <Child1 value1={value1}/>
      <Child2 value2={value2}/>
      <Child3 value3={value3}/>
    </React.Fragment>
  );
}

const mountPoint = document.getElementById("app");

ReactDOM.render(<MainComponent value1="forChild1" value2="forChild2" value3="forChild3"/>, mountPoint);
```

:information_source: the _return_ call must always give a root element with children inside.

:information_source: the below syntax is called _Destructuring_ and it's a feature from _ES6_; the used JavaScript dialect for this training
``` JavaScript
const { title } = props;
```
is equivalent to
``` JavaScript
const title = props.title;
```

:information_source: it's recommended to use _React.Fragment_ instead of _blank div_ as it's more efficient in term of performance (doesn't create an extra DOM node).

**Practice Exercise**: make the components in the previous exercise pass props between them.

## State and the Class Component
The components can now be reused as functions and interact between them by the mean of props. But what if we want those functional components to hold inner data values and more logic inside ? If we stick into functions we will run into trouble by making them complicated. Encapsulating inner data and behavior is done by the concept of the _class_ which is implemented by JavaScript and used by React as the following
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      counter: 0
    };
  }

  render() {
    return <div>Hello {this.props.subject} !!!</div>;
  }
}

const mountPoint = document.getElementById("app");

ReactDOM.render(<Greeting subject="React"/>, mountPoint);
```
The class must have the _render_ method implemented. Notice the use of a constructor to initialize internal state.

:information_source: class components in React can extend _React.PureComponent_. This class is the same as _React.Component_ but it does _shallow_ state comparison for the refresh. This will enhance performance but we must keep the state and props immutable inside the class.

**Practice Exercise**: convert the components in the previous exercise into the class form with inners behavior and state.

## Custom Events
We have now components that can
- be reusable
- encapsulate each other
- pass data between them
- contain inner state and behavior

One thing (at least) remains, how can we add event handling to UI elements supposed to be responsive like buttons ? React provides this feature as shown below
``` jsx
import React from 'react'
import ReactDOM from 'react-dom'

class SubscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      name: 'anonymous',
      member: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitSubscription = this.submitSubscription.bind(this);
  }

  handleInputChange(event) {
    const { type, checked, name, value } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: inputValue
    });
  }

  submitSubscription(event) {
    event.preventDefault();
    const id = Math.random().toString(36).substring(2, 15);
    const registrationInfo = {
      id,
      ...this.props,
      ...this.state
    };
    console.log('registrationInfo', registrationInfo);
  };

  render() {
    const {title, date} = this.props;
    return (
      <React.Fragment>
        <div>
          Subscription to the conference <span>{title}</span>
        </div>
        <div>Scheduled for {date.toDateString()}</div>
        <div>
          <form onSubmit={this.submitSubscription}>
            <div>
              <label>
                Name
                <input name="name"
                    type="input"
                    value={this.state.name}
                    onChange={this.handleInputChange}
              />
              </label>
            </div>
            <div>
              <label>
                Member of the 'Local Geeks' Club
                <input name="member"
                    type="checkbox"
                    checked={this.state.member}
                    onChange={this.handleInputChange}
              />
              </label>
            </div>
            <div>
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mountPoint = document.getElementById("app");

ReactDOM.render(
  <SubscriptionForm
    title="Introducing React"
    date={new Date('2019-04-17T09:00:00')}
  />,
  mountPoint
);
```
This is a complete example where we have a multi-input from with event handling. Notice how we did pass the methods of the class component by reference to handle those submit and input change events. The portion of the code
``` JavaScript
this.handleInputChange = this.handleInputChange.bind(this);
```
is used to _bind_ the event handling function to the component so that it can access its state and props.  
Some of the _ES6_ features are shown like  
_Spread Syntax_ to dilute object properties into a wrapper object
``` JavaScript
const registrationInfo = {
  id,
  ...this.props,
  ...this.state
};
```
and _Computed Property Name_ to update a specific attribute inside an object
``` JavaScript
this.setState({
  [name]: inputValue
});
```

**Practice Exercise**: add button events to the components in the previous exercise.

## The Component's LifeCycle
Class components doesn't only encapsulate state and behavior, they also have a life cycle. This life cycle starts by component creation aka _mounting_, props reception, updating and then _un-mounting_. This [diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) shows the main phases in the component life cycle, which are:
1. _Mounting_: where the component is created and attached to the DOM
2. _Updating_: when state changes and the component must be rendered
3. _Un-Mounting_: when removed from the DOM tree

We can attach our custom behavior to these spots in the life cycle by adding _life cycle methods_ to the class component. The most used ones are:
- _componentDidMount()_: called during the _Mounting_ phase, we use it mainly to load initial data
- _componentWillUnmount()_: called before detaching the component from the DOM, it allows us to free some data before disposing the component

Practical utility of these methods will be shown in the sample application developed for this training.

## Introducing Hooks
This feature was introduced in the version 16.7 of React. Hooks are the new form for the components in React; this means that the finest granularity that a component can have is in the form of a _Hook_ which is a function that can have a state and a life cycle calls like any class component. What justifies the introduction of hooks to React ? two main reasons:
1. changing a component from functional form to the class form is very costly in terms of code migration
2. big projects start to go into _wrapper hell_ as components clutter and become more and more entangled

Before playing with hooks with playground, be sure to update the React version in side the file _package.json_ to 16.7 or above
``` JSON
"dependencies": {
  "react": "16.8.5",
  "react-dom": "16.8.5"
}
```
The simplest hook example is the following
``` jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function SimpleHook() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <div>A Simple Hook</div>
      <div>the count is <span>{count}</span></div>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </React.Fragment>
  );
}

const mountPoint = document.getElementById("app");

ReactDOM.render(<SimpleHook />, mountPoint);
```
It's a function, and this function get access to the state by importing and calling the _setState_ attachment or _hook_. To have access to the life cycle method inside the function, the hook _useEffect_ can be used. The Hook API is well documented in this [link](https://reactjs.org/docs/hooks-reference.html).

:information_source: hooks can coexist with functional and class components, they are not meant to replace them (immediately).

## Going Further
This part of the training did summarize the main concepts of React, we'll discover more throughout practice by setting up a JavaScript development environment for React and by coding a sample application. Finally, the ultimate reference for React is still its [official documentation site](https://reactjs.org/docs/getting-started.html).