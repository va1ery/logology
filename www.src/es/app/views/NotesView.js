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

import container from "../../lib/templates/widgets/container";
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

const kp = require("keypather")();

export default class NotesView extends View {
    get TARGET_SELECTORS() {
        return [
            {selector: "input:textarea", emit: "noteEdited"}
        ];
    }

    onNoteEdited(sender, notice, textarea) {
        let model = kp.get(this, "controller.model");
        if (model) {
            model.note = textarea.value;
        }
    }

    template() {
        let model = kp.get(this, "controller.model");
        return textContainer({contents: [h.el("textarea", {content: model && model.note})]});
    }

}

export function createNotesView(options = {}) {
    return new NotesView(options);
}