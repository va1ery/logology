/*****************************************************************************
 *
 * Author: Kerri Shotts <kerrishotts@gmail.com>
 *         http://www.photokandy.com/books/mastering-phonegap
 *
 * MIT LICENSED
 *
 * Copyright (c) 2016 Packt Publishing
 * Portions Copyright (c) 2016 Kerri Shotts (photoKandy Studios LLC)
 * Portions Copyright various third parties where noted.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 *****************************************************************************/

import scrollContainer from "../../lib/templates/widgets/scrollContainer";
import View from "../../lib/View";
import glyph from "../../lib/templates/widgets/glyph";
import list from "../../lib/templates/widgets/list";
import listItem from "../../lib/templates/widgets/listItem";
import listItemContents from "../../lib/templates/widgets/listItemContents";
import listItemActions from "../../lib/templates/widgets/listItemActions";
import listItemSpacer from "../../lib/templates/widgets/listItemSpacer";
import listHeading from "../../lib/templates/widgets/listHeading";
import listIndicator from "../../lib/templates/widgets/listIndicator";

import h from "yasmf-h";
import L from "../localization/localization";
import GCS from "../../lib/grandCentralStation";

import dictionariesList from "./dictionariesList";

const kp = require("keypather")();

export default class MenuView extends View {
    get TARGET_SELECTORS() {
        return [
            {selector: "tap:ul li > button:not([value^='APP:'])", emit: "dictionaryItemTapped"},
            {selector: "tap:ul li > button[value^='APP:']", emit: "navItemTapped"}
        ];
    }

    get MENU_ITEMS() {
        return [/*
            {label: "nav:get-more-dictionaries", emit: "APP:DO:moreDictionaries"},
            {label: "nav:readability", emit:"APP:DO:readability"},*/
            {label: "nav:settings", emit: "APP:DO:settings"},
            {label: "nav:about", emit: "APP:DO:about"}];
    }

    template() {
        let model = kp.get(this, "controller.model"); // get the dictionary list model
        if (!model) { model = {dictionaries: []} }
        // return a list of all the available dictionaries along with options for downloading
        // more and changing settings.
        return scrollContainer({contents: list({
            contents: /*dictionariesList(model).concat(
                listItemSpacer(),*/
                this.MENU_ITEMS.map(item =>
                    listItem({
                        contents: listItemContents({
                            props: {
                                value: item.emit
                            },
                            contents: [
                                h.el("div.y-flex", L.T(item.label))
                            ]
                        })
                    })
                ) /*)*/
        })
    });
    }

    onDictionaryItemTapped(sender /*: Object*/, notice /*: string*/, listItem/*: Node*/) {
        GCS.emit("APP:DO:viewDictionary", listItem.value);   // select another dictionary
        GCS.emit("APP:DO:menu");   // close the sidebar
    }

    onNavItemTapped(sender/*: Object*/, notice/*: string*/, listItem/*: Node*/) {
        GCS.emit(listItem.value);   // notify the app that it needs to navigate
    }
}

export function createMenuView(options = {}) {
    return new MenuView(options);
}