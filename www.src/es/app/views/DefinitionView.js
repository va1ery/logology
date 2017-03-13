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
import textContainer from "../../lib/templates/widgets/textContainer";
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
import {getSettings} from "../models/Settings";
let settings = getSettings();

const kp = require("keypather")();

export default class DefinitionView extends View {
    get TARGET_SELECTORS() {
        return [
            {selector: "tap spacepressed:ul li > button", emit: "externalResourceTapped"}
        ];
    }

    onExternalResourceTapped(sender, notice, listItem) {
        let model = kp.get(this, "controller.model");
        if (!model) { model = {lemma: ""}; }
        GCS.emit("APP:DO:URL", listItem.value.replace("%WORD%", model.lemma));
    }

    template() {
        let model = kp.get(this, "controller.model");
        if (!model) { model = {entries: []} }  // we need to support an empty set of entries
        return scrollContainer({
            contents:
            [
                textContainer({contents: h.h2(model.lemma)}),
                textContainer({contents: h.ol(
                        model.entries.map(d => h.li([
                            h.el("span.pos", d.partOfSpeech),
                            h.el("span.def", d.gloss)
                        ]))
                )}),
                list({
                    contents: Object.entries(settings.externalResources).map(([k,v]) =>
                        listItem({
                            contents: listItemContents({
                                props: {
                                    value: v
                                },
                                contents: h.el("div.y-flex", L.T("actions:external", {resource: k}))
                            })
                        })
                    )
                })
            ]
        });
    }

}

export function createDefinitionView(options = {}) {
    return new DefinitionView(options);
}