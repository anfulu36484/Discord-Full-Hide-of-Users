// ==UserScript==
// @name        Discord Hide Blocked User Message Bar
// @description Completely hides the clickable bar to view blocked user messages.
// @namespace   Violentmonkey Scripts
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match       *://discordapp.com/*
// 
// ==/UserScript==



(function($) {
    "use strict";

    $.fn.removeBlockedUser = function() {
        $(".message-group-blocked").each(
            function() {
                
                $(this).prev().removeClass("has-divider");
                $(this).hide();
            }
        );

        return this;
    };

    // Helper function for finding all elements matching selector affected by a mutation
    var mutationFind = function(mutation, selector) {
        var target = $(mutation.target),
            addedNodes = $(mutation.addedNodes);
        var mutated = target.add(addedNodes).filter(selector);
        var descendants = addedNodes.find(selector);
        var ancestors = target.parents(selector);
        return mutated.add(descendants).add(ancestors);
    };

    // Watch for new messages in chat messages
    new MutationObserver(function(mutations, observer) {
        mutations.forEach(function(mutation) {
            mutationFind(mutation, ".message").removeBlockedUser();
        });
    }).observe(document, {
        childList: true,
        subtree: true
    });
})(jQuery.noConflict(true));
