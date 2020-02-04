// ==UserScript==
// @name        Discord Full Hide of Users
// @description Completely hides the clickable bar to view blocked user messages /hide avatars / hide of messages in which there are mentions of users.
// @namespace   Violentmonkey Scripts
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match       *://discordapp.com/*
//
// ==/UserScript==


(function($) {
    "use strict";

    
    var blockusers = ["________user1_______", "______user2______"];
    
    
     
    
    
    
    $.fn.removeBlockedUser = function() {
        $(".blockedSystemMessage-2Rk1ek").parent().each(
            function() {
                $(this).hide();
                $(this).siblings().hide()
            }
        );

        return this;
    };

    $.fn.removeDivider = function() {
        $(".divider-3_HH5L").each(
            function() {
                $(this).hide();
            }
        );

        return this;
    };


    $.fn.removeAvatar = function() {
        blockusers.forEach(function(blockuser) {
             $(".member-3-YXUe:contains('"+blockuser+"')").each(
                 function() {
                     $(this).hide();
                 }
             );
        });
        return this;
    };

     $.fn.removeAvatarOffline = function() {
        blockusers.forEach(function(blockuser) {
             $(".memberOffline-2lN7gt.member-3W1lQa:contains('"+blockuser+"')").each(
                 function() {
                     $(this).hide();
                 }
             );
        });
        return this;
    };

    $.fn.removeMessage = function() {
        blockusers.forEach(function(blockuser) {
            $(".containerCozyBounded-1rKFAn.containerCozy-jafyvG.container-1YxwTf:contains('"+blockuser+"')").each(
                function() {
                    $(this).hide();
                }
            );
        });
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



    // Watch for new messages in chat
    new MutationObserver(function(mutations, observer) {
        mutations.forEach(function(mutation) {
            mutationFind(mutation, ".message").removeBlockedUser();
            mutationFind(mutation, ".message").removeMessage();
            mutationFind(mutation, ".divider-3gKybi.dividerRed-MKoLlr.divider-3zi9LO").removeDivider();
            mutationFind(mutation, ".member-3-YXUe").removeAvatar();
            mutationFind(mutation, ".memberOffline-2lN7gt.member-3W1lQa").removeAvatarOffline();
        });
    }).observe(document, {
        childList: true,
        subtree: true
    });
})(jQuery.noConflict(true));
