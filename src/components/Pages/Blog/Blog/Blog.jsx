import React from 'react';

const Blog = () => {
    const blogContents=[
        {
            question:" What are the different ways to manage a state in a React application?",
            answer:"Every React component has a built-in state. This state is an object which stores the property values that belong to a component. State is able to keep data from different components in-sync because each state update re-renders all relevant components."
        },
        {
            question:"How does prototypical inheritance work?",
            answer:"The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object."
        },
        {
            question:"What is a unit test? Why should we write unit tests?",
            answer:"Unit test: Unit Testing is a type of software testing where individual units or components of a software are tested.Unit testing ensures that all code meets quality standards before its deployed. This ensures a reliable engineering environment where quality"
        },
        {
            question:"React vs. Angular vs. Vue?",
            answer:"Virtual DOM implementation and various rendering optimizations make it too fast.re individual units or components of a software are tested. One way data binding available with less complexity Migration between versions is effortlessBest choice for cross-platform and mobile appsAngular uses HTML and CSSSuitable for detailed documentation, large scale, and productive applicationsGoogle long term support availableIt is easily integrated, lightweight, and easy to learn for a beginner.Vue support both one way and two-way data binding.Provides better performance, comparing to othersFor small projects, Vue is the best option."
        }
    ]
    return (
        <div className='mb-10 shadow-lg lg:mx-10 my-10 py-10 rounded-lg'>
            <h2 className='text-center text-5xl my-8 bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-extrabold'>OUR BLOGS</h2>
            <div className='mx-10'>
                {
                    blogContents.map((blogContent,ind) => <div key={ind} className="join join-vertical w-full">
                    <div className="collapse collapse-arrow join-item border border-base-300">
                        <input type="radio" name="my-accordion-1"/>
                        <div className="collapse-title text-xl  bg-gradient-to-r from-blue-700  to-white text-transparent bg-clip-text font-medium">
                            {blogContent.question}
                        </div>
                        <div className="collapse-content">
                            <p>{blogContent.answer}</p>
                        </div>
                    </div>
                </div>)
                }
            </div>
        </div>
    );
};

export default Blog;