/* eslint-disable prettier/prettier */
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallowMount, VueWrapper } from "@vue/test-utils";

const feature = loadFeature("features/example.feature", { loadRelativePath : true });

defineFeature(feature, (test) => {
  test("Opening the initial web page", ({ given, when, then }) => {
    let wrapper: VueWrapper<any>;

    given("The page is open in a browser", () => {
    });

    when("I inspect the page", () => {
      //Nothing here just need it
    });

    then("I should see the landing page", () => {
      // expect(wrapper.html()).toMatch(/^<div.*/);
      console.log('here here');
    });
  });
});
