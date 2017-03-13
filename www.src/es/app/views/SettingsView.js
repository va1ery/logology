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

export default class SettingsView extends View {
    get TARGET_SELECTORS() {
        return [
            {selector: "tap spacepressed:ul li > button", emit: "listItemTapped"},
            {selector: "input:select", emit: "settingChanged"}
        ];
    }

    onSettingChanged(sender, notice, select) {
        settings[select.getAttribute("data-key")] = select.value;
    }

    onListItemTapped(sender, notice, listItem) {
        switch (listItem.value) {
            case "about":
                GCS.emit("APP:DO:about");
                break;
        }
    }

    template() {
        let model = settings.entries;
        return scrollContainer({contents:
            list({
                contents: model.map(category => {
                        return [listHeading({contents: L.T(category.category)})]
                            .concat(category.items.map(setting => {
                                return listItem({
                                    tag: "label",
                                    contents: listItemContents({
                                                props: {
                                                    value: setting.key
                                                },
                                                contents: [
                                                    h.el("div.y-flex name", L.T(setting.name)),
                                                    h.el("div.y-flex value",
                                                        h.select(
                                                            {attrs: {
                                                                "data-key": setting.key
                                                            }},
                                                            setting.options.map(option => h.option(option.value, L.T(option.name),
                                                                                                    {attrs: {
                                                                                                        selected: settings[setting.key] == option.value ? "selected" : undefined
                                                                                                    }}
                                                                                                )),
                                                        )
                                                    )
                                                ]})
                                });
                            })
                        )
                })
                .concat(listHeading({contents: L.T("setting:category:about")}))
                .concat(listItem({
                    contents: listItemContents({
                        props: {
                            value: "about"
                        },
                        contents: [
                            h.el("div.y-flex", L.T("nav:about"))
                        ]
                    })
                }))
            })
        });
    }

}

export function createSettingsView(options = {}) {
    return new SettingsView(options);
}