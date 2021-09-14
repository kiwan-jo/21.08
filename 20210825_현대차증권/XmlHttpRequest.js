//20180913 데모서버 전자결재G 포틀릿이면 메인포틀릿 이동을 G버전 페이지로 이동하도록 추가
var Use_ApprovalG = false;

function BroswerAndNonActiveXCheck() {
    if (typeof (pNoneActiveX) == "undefined") {
        if (window.ActiveXObject || "ActiveXObject" in window) {
            return "IE";
        }
        else if (window.DOMParser) {
            return "CROSS";
        }
    }
    else {
        if (pNoneActiveX == "YES") {
            return "CROSS";
        }
        else {
            if (window.ActiveXObject || "ActiveXObject" in window) {
                return "IE";
            }
            else if (window.DOMParser) {
                return "CROSS";
            }
        }
    }
}

function createXMLHttpRequest() {
    var oXmlRequest;
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        oXmlRequest = new XMLHttpRequest();
    }
    else {
        oXmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return oXmlRequest;
}

function createXmlDom() {
    var xmlDoc;
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        xmlDoc = document.implementation.createDocument("", "", null);
    }
    else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    }
    return xmlDoc;
}

function loadXMLFile(filename) {
    var xmlhttp;
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", filename, false);
    xmlhttp.send();
    return loadXMLString(xmlhttp.responseText);
}
function loadXMLString(xmlstring) {
    var xmlDoc;
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlstring, "text/xml");
        parser = null;
    }
    else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlstring);
    }
    return xmlDoc;
}
function createNode(node, tagName) {
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        return node.createElement(tagName);
    }
    else {
        return node.createNode(1, tagName, "");
    }
}
function InsertText(xmlDoc, node, value) {
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        var newText = document.createTextNode(value);
        node.appendChild(newText);
        xmlDoc.documentElement.appendChild(node);
    }
    else {
        node.text = value;
        xmlDoc.documentElement.appendChild(node);
    }
    return node;
}
function appendChildText(targetNode, node, value) {
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        var newText = document.createTextNode(value);
        node.appendChild(newText);
        targetNode.appendChild(node);
    }
    else {
        node.text = value;
        targetNode.appendChild(node);
    }
    return node;
}

function appendChildCDataText(targetNode, node, value, xmlDoc) {
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        var newText = document.createTextNode(value);
        node.appendChild(newText);
        targetNode.appendChild(node);
    }
    else {
        var CDATA = xmlDoc.createCDATASection(value);
        node.appendChild(CDATA);
        targetNode.appendChild(node);
    }
    return node;
}

function createNodeInsert(xmlparam, node, tagName) {
    node = createNode(xmlparam, tagName);
    xmlparam.appendChild(node);
    return node;
}

function createNodeAndInsertText(xmlparam, node, tagName, value) {
    node = createNode(xmlparam, tagName);
    InsertText(xmlparam, node, value);
    return node;
}

function createNodeAndInsertCDataText(xmlparam, node, tagName, value) {
    node = createNode(xmlparam, tagName);
    InsertCDataText(xmlparam, node, value);
    return node;
}

function InsertCDataText(xmlDoc, node, value) {
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        var newText = document.createTextNode(value);
        node.appendChild(newText);
        xmlDoc.documentElement.appendChild(node);
    }
    else {
        var CDATA = xmlDoc.createCDATASection(value);
        node.appendChild(CDATA);
        xmlDoc.documentElement.appendChild(node);
    }
    return node;
}

function createNodeAndAppandNode(xmlparam, targetNode, node, tagName) {
    node = createNode(xmlparam, tagName);
    targetNode.appendChild(node);
    return node;
}

function createNodeAndAppandNodeText(xmlparam, targetNode, node, tagName, value) {
    node = createNode(xmlparam, tagName);
    appendChildText(targetNode, node, value);
    return node;
}

function createNodeAndAppandNodeCDataText(xmlparam, targetNode, node, tagName, value) {
    node = createNode(xmlparam, tagName);
    appendChildCDataText(targetNode, node, value, xmlparam);
    return node;
}

function GetElementsByTagName(node, tagName) {
    return node.getElementsByTagName(tagName);
}

function SelectNodesNew(xmlDoc, path) {
    var nodes;
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        nodes = xml.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
    }
    else {
        nodes = xmlDoc.selectNodes(path);
    }
    return nodes;
}

function SelectNodes(xmlDoc, elementPath) {
    var parentPath = "";
    var nodeName = "";
    var parentNode = null;
    if (elementPath == null || elementPath == "" || elementPath == "undfined") return false;
    if (elementPath.indexOf("/") == -1) {
        parentPath = elementPath;
        nodeName = elementPath;
        parentNode = xmlDoc.ownerDocument == null ? xmlDoc : xmlDoc.ownerDocument;
    } else {
        parentPath = elementPath.substr(0, elementPath.lastIndexOf("/"));
        nodeName = elementPath.substr(elementPath.lastIndexOf("/") + 1);

        if (parentPath.indexOf("//") != 0) {
            if (parentPath.indexOf("/") == 0) {
                parentPath = "/" + parentPath;
            } else {
                parentPath = "//" + parentPath;
            }
        }
        if (xmlDoc.nodeType == 9) {
            parentNode = SelectSingleNodeNew(xmlDoc, parentPath);
        }
        else {
            parentNode = SelectSingleNodeNew(xmlDoc, parentPath);
        }
    }
    if (parentNode == null) return false;

    return GetElementsByTagName(parentNode, nodeName);
}

function SelectSingleNode(node, tagName) {
    var objNode = null;
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        objNode = node.firstChild;
        while (objNode) {
            if (objNode.nodeType == 1 && objNode.tagName == tagName)
                break;
            else
                objNode = objNode.nextSibling;
        }
    }
    else {
        if (node != null) {
            if (typeof(node.selectSingleNode) != "undefined" && node.selectSingleNode(tagName))
                return node.selectSingleNode(tagName);
            else if(node.getElementsByTagName(tagName).length > 0)
                return node.getElementsByTagName(tagName).item(0);
        }
    }
    return objNode;
}

function SelectSingleNodeNew(xmlDoc, elementPath) {
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        if (elementPath.indexOf("//") != 0) {
            if (elementPath.indexOf("/") == 0) {
                elementPath = "/" + elementPath;
            } else {
                elementPath = "//" + elementPath;
            }
        }
        var nsResolver;
        try {
            nsResolver = xmlDoc.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
        } catch (e) {
            nsResolver = null;
        }
        try {
            var xpathResult = xmlDoc.evaluate(elementPath, xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);
            var elements = null;
            var count = 0;

            var thisNode = xpathResult.iterateNext();
            while (thisNode) {
                if (thisNode != null) {
                    elements = thisNode;
                    break;
                }
                thisNode = xpathResult.iterateNext();
            }
        } catch (e) {
            var elementPathArry = elementPath.split("/");
            var selNode = xmlDoc;

            for (var i = 0; i < elementPathArry.length; i++) {
                if (elementPathArry[i] != "") {
                    selNode = SelectSingleNode(selNode, elementPathArry[i]);
                }
            }
            elements = selNode;
        }
    }
    else {
        try {
            elements = xmlDoc.selectSingleNode(elementPath);
        } catch (e) { }
    }
    return elements;
}

function SelectSingleNodeValue(node, tagName) {
    var strValue = "";
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        var objNode = node.firstChild;

        while (objNode) {
            if (objNode.nodeType == 1 && objNode.tagName.toUpperCase() == tagName.toUpperCase()) {
                if (objNode.firstChild != null && objNode.firstChild.nodeValue != null) {
                    strValue = objNode.firstChild.nodeValue;
                }
                break;
            }
            else {
                objNode = objNode.nextSibling;
            }
        }
    }
    else {
        if (node != null){
            if (typeof(node.selectSingleNode) != "undefined" && node.selectSingleNode(tagName))
                return node.selectSingleNode(tagName).text;
            else if(node.getElementsByTagName(tagName).length > 0)
                return node.getElementsByTagName(tagName).item(0).textContent;
        }
    }
    return strValue;
}

function SelectSingleNodeValueNew(xmlDoc, elementPath) {
    var strValue = "";
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        if (elementPath.indexOf("//") != 0) {
            if (elementPath.indexOf("/") == 0) {
                elementPath = "/" + elementPath;
            } else {
                elementPath = "//" + elementPath;
            }
        }
        try {
            var nsResolver = xmlDoc.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
            var xpathResult = xmlDoc.evaluate(elementPath, xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);
            var elements = null;
            var count = 0;
            var thisNode = xpathResult.iterateNext();
            while (thisNode) {
                if (thisNode != null) {
                    elements = thisNode;
                    break;
                }
                thisNode = xpathResult.iterateNext();
            }
        }
        catch (e) {
            var elementPathArry = elementPath.split("/");
            var selNode = xmlDoc;

            for (var i = 0; i < elementPathArry.length; i++) {
                if (elementPathArry[i] != "") {
                    selNode = SelectSingleNode(selNode, elementPathArry[i]);
                }
            }
            strValue = getNodeText(selNode);
        }
        if (elements != null) {
            strValue = elements.firstChild.nodeValue;
        }
    }
    else {
        if (xmlDoc.selectSingleNode(elementPath))
            return xmlDoc.selectSingleNode(elementPath).text;
    }
    return strValue;
}
function GetSelectSingleNode(nodes, value) {
    var result;
    if (nodes == null || nodes.length == 0) return null;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName == value) {
            result = nodes[i]; break;
        }
    }
    return result;
}

function GetChildNodes(node) {
    var elements = new Array();
    objNode = node.firstChild;

    var idx = 0;
    while (objNode) {
        if (objNode.nodeType == 1) {
            elements[idx++] = objNode;
        }
        objNode = objNode.nextSibling;
    }
    return elements;
}
function GetChildNodesByNodeName(node, nodeName) {
    var elements = new Array();
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        var parentNode = SelectSingleNodeNew(node, "//" + nodeName).parentNode;
        elements = GetElementsByTagName(parentNode, nodeName);
    }
    else {
        return node.getElementsByTagName(nodeName);
    }
    return elements;
}

function GetLastChildNodes(node, params) {
    var resultNodes = GetChildNodes(node);
    if (params == null || params.length == 0) return resultNodes;
    for (var i = 0; i < params.length; i++) {
        var idx = parseInt(params[i], 10);
        resultNodes = GetChildNodes(resultNodes[idx]);
    }
    return resultNodes;
}

function SetChildNodeText(objDoc, params, inputIdx, value) {
    params.push(inputIdx);
    var arrNode = new Array();
    if (params == null || params.length == 0) return;

    var resultNode = objDoc;
    for (var i = 0; i < params.length; i++) {
        var idx = parseInt(params[i], 10);
        resultNode = GetNodeLevel(resultNode, arrNode, idx);
    }
    params.pop();

    if (arrNode == null || arrNode.length == 0) return;
    var nodecnt = arrNode.length;
    var idx0 = 0;
    var idx1 = 1;
    var idx2 = 2;
    var idx3 = 3;
    var idx4 = 4;
    var idx5 = 5;
    var idx6 = 6;
    var idx7 = 7;
    var idx8 = 8;
    var idx9 = 9;

    for (var i = 0; i < arrNode.length; i++) {
        var idx = parseInt(arrNode[i], 10);
        switch (i) {
            case 0: idx0 = idx; break;
            case 1: idx1 = idx; break;
            case 2: idx2 = idx; break;
            case 3: idx3 = idx; break;
            case 4: idx4 = idx; break;
            case 5: idx5 = idx; break;
            case 6: idx6 = idx; break;
            case 7: idx7 = idx; break;
            case 8: idx8 = idx; break;
            case 9: idx9 = idx; break;
        }
    }
    switch (nodecnt) {
        case 1: setNodeText(objDoc.childNodes[idx0], value); break;
        case 2: setNodeText(objDoc.childNodes[idx0].childNodes[idx1], value); break;
        case 3: setNodeText(objDoc.childNodes[idx0].childNodes[idx1].childNodes[idx2], value); break;
        case 4: setNodeText(objDoc.childNodes[idx0].childNodes[idx1].childNodes[idx2].childNodes[idx3], value); break;
        case 5: setNodeText(objDoc.childNodes[idx0].childNodes[idx1].childNodes[idx2].childNodes[idx3].childNodes[idx4], value); break;
        case 6: setNodeText(objDoc.childNodes[idx0].childNodes[idx1].childNodes[idx2].childNodes[idx3].childNodes[idx4].childNodes[idx5], value); break;
        case 7: setNodeText(objDoc.childNodes[idx0].childNodes[idx1].childNodes[idx2].childNodes[idx3].childNodes[idx4].childNodes[idx5].childNodes[idx6], value); break;
        case 8: setNodeText(objDoc.childNodes[idx0].childNodes[idx1].childNodes[idx2].childNodes[idx3].childNodes[idx4].childNodes[idx5].childNodes[idx6].childNodes[idx7], value); break;
        case 9: setNodeText(objDoc.childNodes[idx0].childNodes[idx1].childNodes[idx2].childNodes[idx3].childNodes[idx4].childNodes[idx5].childNodes[idx6].childNodes[idx7].childNodes[idx8], value); break;
        case 10: setNodeText(objDoc.childNodes[idx0].childNodes[idx1].childNodes[idx2].childNodes[idx3].childNodes[idx4].childNodes[idx5].childNodes[idx6].childNodes[idx7].childNodes[idx8].childNodes[idx9], value); break;
    }
    return true;
}
function GetNodeLevel(node, arrNode, paraIdx) {
    objNode = node.firstChild;
    var idx = 0;
    var nodeIdx = 0;
    while (objNode) {
        if (objNode.nodeType == 1) {
            if (idx == paraIdx) {
                arrNode.push(nodeIdx);
                return objNode;
                break;
            } else {
                idx++;
            }
        }
        objNode = objNode.nextSibling;
        nodeIdx++;
    }
    return objNode;
}

function GetAttribute(node, name) {
    var result = "";

    if (node != null && name != null) {
        if (node.getAttribute(name) == null || node.getAttribute(name) == "undefined") {
            return null;
        }
        else {
            result = node.getAttribute(name);
            return String(result.trim());
        }
    }
    else {
        return result.trim();
    }
}

function SetAttribute(node, name, value) {

    if (node != null) node.setAttribute(name, value);
}

function getXmlString(xmlDoc) {

    if (xmlDoc.nodeType == 9) {
        xmlDoc = xmlDoc.documentElement;
    }
    var resultXML = "";
    if (xmlDoc.__proto__ && window.XMLSerializer) {
        xmlDoc.__proto__.__defineGetter__("xml", function () { return (new XMLSerializer()).serializeToString(xmlDoc); });
    }

    if (xmlDoc.nodeType == 9) {
        resultXML = trim_Cross(getFirstChild(xmlDoc).xml);
    }
    else if (xmlDoc.nodeType == 1) {
        if (typeof (xmlDoc.xml) != "undefined")
            resultXML = trim_Cross(xmlDoc.xml);
        else
            resultXML = trim_Cross((new XMLSerializer()).serializeToString(xmlDoc));
    }
    else {
        resultXML = trim_Cross(xmlDoc.xml);
    }
    return resultXML;
}

function GetSerializeXml(oNode) {
    var oSerializer = new XMLSerializer();
    return oSerializer.serializeToString(oNode);
}

function getFirstChild(node) {
    var child1 = node.firstChild;
    while (child1.nodeType != 1) {
        child1 = child1.nextSibling;
    }

    return child1;
}
function getLastChild(node) {
    var lchild = node.lastChild;
    while (lchild.nodeType != 1) {
        lchild = lchild.previousSibling;
    }
    return lchild;
}
function getNodeText(node) {
    var result = "";
    if (node != null) {
        if (BroswerAndNonActiveXCheck() == "CROSS") {
            if (typeof (node.textContent) != "undefined") {
                result = trim_Cross(node.textContent);
            }
            else {
                result = trim_Cross(node.text);
            }
        }
        else {
            if (typeof (node.innerText) == "undefined") {
                if (typeof (node.textContent) != "undefined") {
                    result = trim_Cross(node.textContent);
                }else
                    result = trim_Cross(node.text);
            }
            else {
                result = trim_Cross(node.innerText);
            }

        }
    }
    return result;
}

function setNodeText(node, value) {
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        node.textContent = value;
    }
    else {
        if (typeof (node.innerText) == "undefined") {
            node.text = value;
        }
        else {
            node.innerText = value;
        }
    }
}

function getFieldText(node) {
    var result = "";
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        result = trim_Cross(node.textContent);
    }
    else {
        result = trim_Cross(node.innerText);
    }
    return result;
}

function setFieldText(node, value) {
    var result = "";
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        node.textContent = value;
    }
    else {
        node.innerText = value;
    }
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.replaceAll = function (org, dest) {
    return this.replace(new RegExp(org, "gi"), dest);
};

function trim_Cross(value) {
    value = String(value);
    value = value.trim();
    if (value == null || value == "undefined" || value == "" || value == "\n") {
        return "";
    }
    return value.trim();
}

function TrimText(orgStr) {
    var copyStr = "";
    var strIndex;
    for (strIndex = 0; strIndex < orgStr.length; strIndex++) {
        if (orgStr.charAt(strIndex) == ' ') continue;
        else {
            copyStr = orgStr.substr(strIndex);
            break;
        }
    }

    for (strIndex = copyStr.length - 1; strIndex >= 0; strIndex--) {
        if (copyStr.charAt(strIndex) == ' ') {
            continue;
        }
        else {
            copyStr = copyStr.substr(0, strIndex + 1);
            break;
        }
    }
    return copyStr;
}

function getXmlFromHttp(req) {
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        return (new DOMParser()).parseFromString(req.responseText, "text/xml");
    }
    else {
        return req.responseXML;
    }
}

function createXMLDomFromXmlString(pXML) {
    var xmlDoc;
    if (BroswerAndNonActiveXCheck() == "CROSS") {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(pXML, "text/xml");
        parser = null;
        return xmlDoc;
    }
    else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.loadXML(pXML);
        return xmlDoc;
    }
}
function CrossYN() {
    var result = true;
    if (navigator.appName.indexOf("Microsoft") > -1) {
        result = false;
    } else {
        if (navigator.userAgent.indexOf("Trident") > 0)
            result = false;
        else
            result = true;
    }
    return result;
}

function ConvertMHTtoHTML_Old(pURL) {
    var rtnVal = '';
    try {
        var xmlhttp = createXMLHttpRequest();
        var xmlpara = createXmlDom();
        var objNode;
        createNodeInsert(xmlpara, objNode, "PARAMETER");
        createNodeAndInsertText(xmlpara, objNode, "strURL", pURL);
        xmlhttp.open("POST", "/myoffice/CKEditor/MHTtoHTML.aspx", false);
        xmlhttp.send(xmlpara);

        if (xmlhttp.status == "200") rtnVal = xmlhttp.responseText;
    }
    catch (e) { }
    finally { return rtnVal }
}

function ConvertMHTtoHTML_URL(pURL) {
    var rtnVal = '';
    try {
        var xmlhttp = createXMLHttpRequest();
        var xmlpara = createXmlDom();
        var objNode;
        createNodeInsert(xmlpara, objNode, "PARAMETER");
        createNodeAndInsertText(xmlpara, objNode, "strURL", pURL);
        xmlhttp.open("POST", "/myoffice/CKEditor/MHTtoHTML.aspx", false);
        xmlhttp.send(xmlpara);

        if (xmlhttp.status == "200") rtnVal = xmlhttp.responseText;
    }
    catch (e) { }
    finally { return rtnVal }
}

// FormBuilder
function ConvertMHTtoHTMLWithNoEnc(pURL) {
    var rtnVal = '';
    try {
        var xmlhttp = createXMLHttpRequest();
        var xmlpara = createXmlDom();
        var objNode;
        createNodeInsert(xmlpara, objNode, "PARAMETER");
        createNodeAndInsertText(xmlpara, objNode, "strURL", pURL);
        xmlhttp.open("POST", "/myoffice/CKEditor/MHTtoHTML.aspx?NoEnc=YES", false);
        xmlhttp.send(xmlpara);

        if (xmlhttp.status == "200") rtnVal = xmlhttp.responseText;
    }
    catch (e) { }
    finally { return rtnVal }
}
// FormBuilder - end

function ConvertMHTtoHTML(pKeyID, pModule, pType, pMode) {
    var rtnVal = '';
    try {
        var xmlhttp = createXMLHttpRequest();
        var xmlpara = createXmlDom();
        var objNode;
        createNodeInsert(xmlpara, objNode, "PARAMETER");
        createNodeAndInsertText(xmlpara, objNode, "KEY", pKeyID);
        createNodeAndInsertText(xmlpara, objNode, "MODULE", pModule);
        createNodeAndInsertText(xmlpara, objNode, "TYPE", pType);
        createNodeAndInsertText(xmlpara, objNode, "MODE", pMode);
        xmlhttp.open("POST", "/myoffice/CKEditor/MHTtoHTML_Body.aspx", false);
        xmlhttp.send(xmlpara);

        if (xmlhttp.status == "200") rtnVal = xmlhttp.responseText;
    }
    catch (e) { }
    finally { return rtnVal }
}

function ConvertHTMLtoMHT(pContent) {
    var rtnVal = "ERROR";
    try {
        pContent = DelComment(pContent);
        var xmlhttp = createXMLHttpRequest();
        var xmlpara = createXmlDom();
        var objNode;
        createNodeInsert(xmlpara, objNode, "PARAMETER");
        createNodeAndInsertText(xmlpara, objNode, "strHTML", pContent);

        xmlhttp.open("POST", "/myoffice/CKEditor/HTMLtoMHT.aspx", false);
        xmlhttp.send(xmlpara);
        if (xmlhttp.status == "200") rtnVal = xmlhttp.responseText;
    }
    catch (e) { alert(xmlhttp.status + " : " + e.description);}
    finally { return rtnVal }
}

function CKediter_Trim(value) {
    var temp = trim_Cross(value);
    temp = temp.replace(/\n/g, "");
    temp = temp.replace(/\r/g, "");
    return temp;
}

function GetFieldsList(iframePage) {
    var FieldsList = new Array();
    var FieldCount = 0;
    var count = 0;
    var i = 0;
    count = iframePage.contentWindow.document.getElementsByTagName("*").length;
    for (i = 0; i < count; i++) {
        if (iframePage.contentWindow.document.getElementsByTagName("*")[i].className == "FIELD") {
            FieldsList[FieldCount] = iframePage.contentWindow.document.getElementsByTagName("*")[i];
            FieldCount++;
        }
    }
    return FieldsList;
}

function GetBODY(iframePage) {
    var BODYTag;
    var count = 0;
    var i = 0;
    count = iframePage.contentWindow.document.getElementsByTagName("*").length;
    for (i = 0; i < count; i++) {
        if (iframePage.contentWindow.document.getElementsByTagName("*")[i].tagName == 'BODY') {
            BODYTag = iframePage.contentWindow.document.getElementsByTagName("*")[i];
        }
    }
    return BODYTag;
}

function GetListItem(pList, str) {
    for (i = 0; i < pList.length; i++) {
        if (pList[i].id == str)
            return pList[i];
    }
}

function GetNamedItem(iframePage, id, index) {
    var rtnVal = null;
    var tmp = null;

    if (index) {
        tmp = iframePage.contentWindow.document.getElementById(id)[index];
        if (tmp && tmp.className.toUpperCase() == "FIELD") {
            if (!tmp.FieldID)
                tmp.FieldID = tmp.id;
            rtnVal = tmp;
        }
    }
    else {
        tmp = iframePage.contentWindow.document.getElementById(id);
        if (tmp && tmp.className.toUpperCase() == "FIELD") {
            if (!tmp.FieldID)
                tmp.FieldID = tmp.id;
            rtnVal = tmp;
        }
    }
    return rtnVal
}

function GetMhtContentHTML(pfilepath) {
    var Result = "";
    try {
        var fullPath = document.location.protocol + "//" + document.location.hostname + "/myoffice/Common/DownloadAttach.aspx?filepath=" + escape(pfilepath);
        var xmlhttp = createXMLHttpRequest();
        xmlhttp.open("POST", "/myoffice/CKEditor/MHTtoHTML_Content.aspx?href=" + fullPath, false);
        xmlhttp.send();
        Result = xmlhttp.responseText;
    } catch (e) {
        Result = e.description;
    }
    return Result;
}

function setpause(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function GetOpenPosition(popUpW, popUpH) {
    var left = window.screenLeft + (screen.availWidth / 2) - (popUpW / 2);
    var top = window.screenTop + (screen.availHeight / 2) - (popUpH / 2);

    var feature = ",left=" + left + ",top=" + top;
    return feature
}

function GetbrowserLanguage() {
    var strReturn = "";
    var strLang = "";
    if (window.navigator.language == undefined) {
        strLang = window.navigator.browserLanguage;
    }
    else
        strLang = window.navigator.language;

    switch (strLang) {
        case "ko": strReturn = "949";
            break;
        case "ko-KR": strReturn = "949";
            break;
    }
    return strReturn;
}

function GetCKEditerHeader() {
    return "<HEAD><TITLE></TITLE><META content=\"text/html; charset=utf-8\" http-equiv=Content-Type><META name=GENERATOR content=\"MSHTML 8.00.7601.17622\"></HEAD>";
}
function KeEventControl(obj) {
    useragt = navigator.userAgent.toUpperCase();
    if (useragt.indexOf("SAFARI") > 0 && useragt.indexOf("CHROME") < 0) {
        useragt = useragt.substring(useragt.indexOf("VERSION/") + 8, useragt.indexOf("VERSION/") + 9);
        if (parseInt(useragt) > 5) {
            return;
        }
    }

    obj.onkeydown = function () {
        if (parseInt(window.event.keyCode) >= 48 && parseInt(window.event.keyCode) <= 126)
            return false;
        if (parseInt(window.event.keyCode) == 189 || parseInt(window.event.keyCode) == 187 ||
            parseInt(window.event.keyCode) == 220 || parseInt(window.event.keyCode) == 219 ||
            parseInt(window.event.keyCode) == 221 || parseInt(window.event.keyCode) == 222 ||
            parseInt(window.event.keyCode) == 186 || parseInt(window.event.keyCode) == 188 ||
            parseInt(window.event.keyCode) == 190 || parseInt(window.event.keyCode) == 191 || parseInt(window.event.keyCode) == 32 || parseInt(window.event.keyCode) == 192)
            return false;
    };
}

function ReplaceXML(str) {
    str = ReplaceAll(str, "&", "&amp;");
    str = ReplaceAll(str, "<", "&lt;");
    str = ReplaceAll(str, ">", "&gt;");
    str = ReplaceAll(str, "'", "&apos;");
    str = ReplaceAll(str, "\"", "&quot;");
    return str;
}

function ReplaceHTML(str) {
    str = ReplaceAll(str, "&#39;", "'");
    str = ReplaceAll(str, "&amp;", "&");
    str = ReplaceAll(str, "&lt;", "<");
    str = ReplaceAll(str, "&gt;", ">");
    str = ReplaceAll(str, "&apos;", "'");
    str = ReplaceAll(str, "&quot;", "\"");
    return str;
}

function ReplaceAll(pStrContent, pStrOrg, pStrRep) {
    return pStrContent.split(pStrOrg).join(pStrRep);
}

function ReplaceValidString(pOrgStr) {
    pOrgStr = MakeXMLString(pOrgStr);
    pOrgStr = ReplaceText(pOrgStr, "\"", "");
    pOrgStr = ReplaceText(pOrgStr, "\'", "");
    return pOrgStr;
}

function GetOpenWindowfeature(popUpW, popUpH, scrollFlag) {
    var left, top;
    try {
        left = window.top.outerWidth / 2 + window.top.screenX - (popUpW / 2);
        top = window.top.outerHeight / 2 + window.top.screenY - (popUpH / 2);
    }
    catch (e) {
        left = window.outerWidth / 2 + window.screenX - (popUpW / 2);
        top = window.outerHeight / 2 + window.screenY - (popUpH / 2);
    }

    var feature;
    if (typeof(scrollFlag) == "undefined" || scrollFlag == "NO" || !scrollFlag)
        feature = "height=" + popUpH + "px,width=" + popUpW + "px,left=" + left + ",top=" + top + ", status=no, toolbar=no, menubar=no,location=no, resizable=no";
    else
        feature = "height=" + popUpH + "px,width=" + popUpW + "px,left=" + left + ",top=" + top + ",scrollbars=yes, status=no, toolbar=no, menubar=no,location=no, resizable=no";
    return feature;
}

function GetOpenWindow(url, target, popUpW, popUpH, resizeFlag) {
    var resize;
    url = addQueryParam(url, "PAGETYPE", "POPUP");

    if (MACSAFARIYN())
        popUpH = popUpH + 50;

    var left, top;
    try {
        left = window.top.outerWidth / 2 + window.top.screenX - (popUpW / 2);
        top = window.top.outerHeight / 2 + window.top.screenY - (popUpH / 2);
    }
    catch (e) {
        left = window.outerWidth / 2 + window.screenX - (popUpW / 2);
        top = window.outerHeight / 2 + window.screenY - (popUpH / 2);
    }
    
    if (typeof (resizeFlag) == "undefined" || resizeFlag == "NO" || !resizeFlag)
        resize = "resizable=no";
    else
        resize = "resizable=yes";

    var feature = "height = " + popUpH + "px, width = " + popUpW + "px,left=" + left + "px ,top=" + top + "px, status = no, toolbar=no, menubar=no,location=no, scrollbars=yes," + resize;
	var result = window.open(url, target, feature);
    return result;
}

var PopUpFlag = false;
var OriginalFrame = "";
var NewFrame = "";
function DivPopUpShow(popUpW, popUpH, URL) {
    try {
        URL = addQueryParam(URL, "PAGETYPE", "LAYER");
        if (checkLoaderLayer()) {
            document.getElementsByClassName("loader")[0].style.display = "block";
        }
        
        var Position = DivPopUpPosition(popUpW, popUpH);
        if (document.documentElement.clientHeight < popUpH + 30) {
            document.getElementById("Main_iFramePanel").style.top = "15px";
            document.getElementById("Main_iFramePanel").style.marginTop = 0;
            document.getElementById("Main_iFramePanel").style.height = (popUpH + 20) + "px";
        }
        else {
            document.getElementById("Main_iFramePanel").style.top = "50%";
            document.getElementById("Main_iFramePanel").style.marginTop = -(popUpH / 2) + document.documentElement.scrollTop + "px";
            document.getElementById("Main_iFramePanel").style.height = "100%"
        }

        if (document.documentElement.clientWidth < popUpW + 30) {
            document.getElementById("Main_iFramePanel").style.left = "15px";
            document.getElementById("Main_iFramePanel").style.marginLeft = 0;
        }
        else {
            document.getElementById("Main_iFramePanel").style.left = "50%";
            document.getElementById("Main_iFramePanel").style.marginLeft = -(popUpW / 2) + "px";
        }
        
        document.getElementById("Main_iFramePanel").style.height = popUpH + "px";
        document.getElementById("Main_iFramePanel").style.width = popUpW + "px";
        document.getElementById("Main_iFramePanel").setAttribute("_width", document.getElementById("Main_iFramePanel").style.width);
        document.getElementById("Main_iFramePanel").setAttribute("_height", document.getElementById("Main_iFramePanel").style.height);
        document.getElementById("Main_iFramePanel").setAttribute("_margintop", document.getElementById("Main_iFramePanel").style.marginTop);
        document.getElementById("Main_iFramePanel").setAttribute("_marginleft", document.getElementById("Main_iFramePanel").style.marginLeft);
        document.getElementById("Main_iFramePanel").style.minHeight = null;
        document.getElementById("Main_iFramePanel").style.minWidth = null;

        document.getElementById("Main_iFrameLayer").style.width = "100%";
        document.getElementById("Main_iFrameLayer").style.height = "100%";
        document.getElementById("Main_mailPanel").style.display = "";
        document.getElementById("Main_iFramePanel").style.display = "";

        OriginalFrame = document.getElementById("Main_iFrameLayer");
        NewFrame = document.createElement("iframe");
        NewFrame.id = OriginalFrame.getAttribute("id");
        NewFrame.style.width = "100%";
        NewFrame.style.height = "100%";
        NewFrame.style.border = "none";
        NewFrame.onload = function () { document.getElementsByClassName("loader")[0].style.display = "none"; };
        NewFrame.src = URL;
        var parent = OriginalFrame.parentNode;
        parent.replaceChild(NewFrame, OriginalFrame);
        PopUpFlag = true;
    } catch (e) {
        console.log("function[DivPopUpShow] : " + e.message);
    }
}

function DivPopUpHidden() {
    try {
        //해당함수 호출후 window.open안되는 현상 수정 - 수정전
        //document.getElementById("Main_mailPanel").style.display = "none";
        //document.getElementById("Main_iFramePanel").style.display = "none";
        //OriginalFrame = document.getElementById("Main_iFrameLayer");
        //NewFrame = document.createElement("iframe");
        //NewFrame.id = OriginalFrame.getAttribute("id");
        //NewFrame.width = OriginalFrame.getAttribute("width");
        //NewFrame.height = OriginalFrame.getAttribute("height");
        //NewFrame.style.border = "none";
        //NewFrame.src = "/myoffice/blank.htm";

        //OriginalFrame.src = "/myoffice/blank.htm";
        //OriginalFrame.style.border = "none";
        //var parent = OriginalFrame.parentNode;
        //parent.replaceChild(NewFrame, OriginalFrame);
        //PopUpFlag = false;

        //해당함수 호출후 window.open안되는 현상 수정 - 수정후
        document.getElementById("Main_mailPanel").style.display = "none";
        document.getElementById("Main_iFramePanel").style.display = "none";
        OriginalFrame = document.getElementById("Main_iFrameLayer");
        OriginalFrame.src = "/myoffice/blank.htm";
        OriginalFrame.style.border = "none";
        PopUpFlag = false;

        //끝

        //if (document.getElementById("Main_mailPanel2")) {
        //    document.getElementById("Main_mailPanel2").style.display = "none";
        //}

        //window.focus(); //20180608 ahh X 닫기 시 input focusing이 안되어 수정

        // 레이어 팝업 닫고 부모창의 input text에 커서가 동작하지 않는 현상 처리.
	// Datepicker, Timepicker에 Focus가 발생하지 않도록 처리.
        var pInputElements = document.getElementsByTagName("INPUT");
        for (var i = 0; i < pInputElements.length; i++) {
            if (pInputElements[i].getAttribute("type") == "text") {
                if (!pInputElements[i].classList.contains("DatePicker_class") &&
                    !pInputElements[i].classList.contains("hasDatepicker") &&
                    !pInputElements[i].classList.contains("ui-timepicker-input")) {
                    pInputElements[i].focus();
                }
            }
        }
        document.documentElement.focus();
    } catch (e) { }
}

function Layer_Close() {
   if (typeof parent.DivPopUpHidden === "function") {
        parent.DivPopUpHidden();
    }
}

function Layer_Sub_Close() {
    parent.DivPopUpHidden_sub();
}

function DivPopUpPosition(popUpW, popUpH) {
    var ReturnValue = new Array();
    var heigth = document.documentElement.clientHeight;
    if (heigth == 0)
        heigth = document.body.clientHeight;

    var width = document.documentElement.clientWidth;
    if (width == 0)
        width = document.body.clientWidth;

    var left = 0;
    var top = 0;
    var pleftpos;
    pleftpos = parseInt(width) - popUpW;
    heigth = parseInt(heigth) - popUpH;
    width = parseInt(width) - pleftpos;
    if (heigth < (popUpH + 50))
        ReturnValue[0] = (heigth / 2);
    else
        ReturnValue[0] = (heigth / 2) - 50;

    ReturnValue[1] = pleftpos / 2;
    return ReturnValue;
}

function Resize_Screen() {	
    if (document.getElementById("Main_iFramePanel") != null) {
        if (document.getElementById("Main_iFramePanel").style.display == "") {
            document.getElementById("Main_mailPanel").style.width = "100%";
            var LayerWidth = parseInt(document.getElementById("Main_iFramePanel").clientWidth);
            if (document.documentElement.clientWidth < LayerWidth + 30) {
                document.getElementById("Main_iFramePanel").style.marginLeft = 0;
                document.getElementById("Main_iFramePanel").style.left = "15px";
            }
            else {
                document.getElementById("Main_iFramePanel").style.marginLeft = -(LayerWidth / 2) + "px";
                document.getElementById("Main_iFramePanel").style.left = "50%";
            }

            var LayerHeight = parseInt(document.getElementById("Main_iFrameLayer").clientHeight);
            if (document.documentElement.clientHeight < LayerHeight + 30) {
                document.getElementById("Main_mailPanel").style.height = (LayerHeight + 20) + "px";
                document.getElementById("Main_iFramePanel").style.marginTop = 0;
                document.getElementById("Main_iFramePanel").style.top = (document.documentElement.scrollTop + 15).toString() + "px";
            }
            else {
                document.getElementById("Main_mailPanel").style.height = "100%";
                document.getElementById("Main_iFramePanel").style.marginTop = (document.documentElement.scrollTop - (LayerHeight / 2)).toString() + "px";
                document.getElementById("Main_iFramePanel").style.top = "50%";
            }
        }
    }

    for (var i = 0; i < document.getElementsByName("POPUPNOTICE").length; i++) {
        if (document.getElementsByName("POPUPNOTICE")[i].style.display == "") {
            var _width = 800;
            var _height = 900;
            var _portalWidth = document.documentElement.clientWidth;
            var _portalHeight = document.documentElement.clientHeight;
            var _popupWidth = "";

            if (_portalWidth - 200 > _width)
                _popupWidth = _width;
            else
                _popupWidth = _portalHeight - 200;

            if (_portalHeight - 200 > _height)
                _popuphHeight = _height
            else
                _popuphHeight = _portalHeight - 200;

            document.getElementsByName("POPUPNOTICE")[i].style.display = "";
            document.getElementsByName("POPUPNOTICE")[i].style.width = _popupWidth + "px";
            document.getElementsByName("POPUPNOTICE")[i].style.height = _popuphHeight + "px";


            document.getElementsByName("POPUPNOTICE")[i].getElementsByTagName("iframe")[0].style.width = _popupWidth + "px";
            document.getElementsByName("POPUPNOTICE")[i].getElementsByTagName("iframe")[0].style.height = (_popuphHeight - document.getElementsByName("POPUPNOTICE")[i].getElementsByTagName("dl")[0].offsetHeight) + "px";
        }
    }
}

// 모든창에서 resize_screen을 태우도록 처리.
window.addEventListener("resize", function () {
    if (typeof Resize_Screen === "function") {
        Resize_Screen();
    }
});

function LayerPopupLayoutSize() {
    if (document.getElementsByClassName("btnposition").length > 0)
        document.getElementById("LayerPopupLayout").style.height = document.documentElement.clientHeight - 87 + "px";
    else
        document.getElementById("LayerPopupLayout").style.height = document.documentElement.clientHeight - 36 + "px";
}

var Alert_Message_DialogArgument = new Array();
function Alert_Message(pAlertContent, CompleteFunction, Type, pWidth, pHeight) {
    var parameter = pAlertContent;
    var url = "/myoffice/Common/Alert_Message.aspx";

    Alert_Message_DialogArgument[0] = parameter;
    if (CompleteFunction != null)
        Alert_Message_DialogArgument[1] = CompleteFunction;
    else
        Alert_Message_DialogArgument[1] = Alert_Message_Complete;

    var winWidth = 300;
    var winHeight = 204;

    if (arguments.length >= 4 && winWidth < pWidth)
        winWidth = pWidth;

    if (arguments.length >= 5 && winHeight < pHeight)
        winHeight = pHeight;

    if (Type == "OPEN") {
        var OpenWin = GetOpenWindow(url, "", winWidth, winHeight, "NO");
    }
    else
        DivPopUpShow(winWidth, winHeight, url);
}

function Alert_Message_Complete() {
    DivPopUpHidden();
    return;
}

var Confirm_Alert_dialogArgument = new Array();
function Confirm_Alert_Message(pInformationContent, CompleteFunction, Type) {
    var parameter = pInformationContent;
    var url = "/myoffice/Common/Confirm_Message.aspx";
    Confirm_Alert_dialogArgument[0] = parameter;

    if (CompleteFunction != null)
        Confirm_Alert_dialogArgument[1] = CompleteFunction;
    else
        Confirm_Alert_dialogArgument[1] = Confirm_Alert_Message_Complete;

    if (Type == "OPEN") {
        GetOpenWindow(url + "?type=open", "Confirm_Message", 300, 204, "NO");
    }
    else {
        DivPopUpShow(300, 204, url);
    }
}

function Confirm_Alert_Message_Complete() {
    DivPopUpHidden();
    return;
}

var urlLoadFlag = true;  //DOCID 변경되는 현상 수정
var Page_OnUnload_Event = false;
var Write_Flag = false;
var LoadUrlContent_URL = "";
var LoadUrlContent_TYPE = "";
function LoadUrlContent(Url, Type, _target, _TargetWidth, _TargetHeight, callback) {
    Url = addQueryParam(Url, "PAGETYPE", "LOAD");
    // Url = addQueryParam(Url, "rnd", String((new Date()).getTime()).replace(/\D/gi, ''));

    LoadUrlContent_URL = Url;
    LoadUrlContent_TYPE = Type;
    if (GetPageType() == "LAYER") {
        parent.DivPopUpShow(_TargetWidth, _TargetHeight, Url);
        parent.DivPopUpHidden();
    } else if (GetPageType() == "POPUP") {
        if (opener != null && typeof opener.GetOpenWindow === "function") {
            opener.GetOpenWindow(Url, _target, _TargetWidth, _TargetHeight, "NO");
        }
        else if (typeof GetOpenWindow === "function") {
            GetOpenWindow(Url, _target, _TargetWidth, _TargetHeight, "NO");
        }
        window.close();
    } else {
        if (typeof (pPageUrlType) != "undefined") {
            if (Write_Flag && urlLoadFlag && pPageUrlType != "APPRCONFIG") //20181126 ahh 환경설정 페이지에서는 필요없음  //DOCID 변경되는 현상 수정
                Confirm_Alert_Message(PageMoveStr, PageMove_Confirm, "");
            else
                SessionLoadUrlContent(LoadUrlContent_URL, LoadUrlContent_TYPE, callback);
        } else {
            if (Write_Flag && urlLoadFlag)  //DOCID 변경되는 현상 수정
                Confirm_Alert_Message(PageMoveStr, PageMove_Confirm, "");
            else
                SessionLoadUrlContent(LoadUrlContent_URL, LoadUrlContent_TYPE, callback);
        }
    }
}

// 연속 호출 방지
var curXhr = null;
function LoadUrlContent_INT(Url, Type, _target, _TargetWidth, _TargetHeight, callback) {
    if (curXhr != null)
        curXhr.abort();

    Url = addQueryParam(Url, "PAGETYPE", "LOAD");

    LoadUrlContent_URL = Url;
    LoadUrlContent_TYPE = Type;
    if (GetPageType() == "LAYER") {
        parent.DivPopUpShow(_TargetWidth, _TargetHeight, Url);
        parent.DivPopUpHidden();
    } else if (GetPageType() == "POPUP") {
        if (opener != null && typeof opener.GetOpenWindow === "function") {
            opener.GetOpenWindow(Url, _target, _TargetWidth, _TargetHeight, "NO");
        }
        else if (typeof GetOpenWindow === "function") {
            GetOpenWindow(Url, _target, _TargetWidth, _TargetHeight, "NO");
        }
        window.close();
    } else {
        if (typeof (pPageUrlType) != "undefined") {
            if (Write_Flag && urlLoadFlag && pPageUrlType != "APPRCONFIG") //20181126 ahh 환경설정 페이지에서는 필요없음  //DOCID 변경되는 현상 수정
                Confirm_Alert_Message(PageMoveStr, PageMove_Confirm, "");
            else
                SessionLoadUrlContent(LoadUrlContent_URL, LoadUrlContent_TYPE, callback, true);
        } else {
            if (Write_Flag && urlLoadFlag)  //DOCID 변경되는 현상 수정
                Confirm_Alert_Message(PageMoveStr, PageMove_Confirm, "");
            else
                SessionLoadUrlContent(LoadUrlContent_URL, LoadUrlContent_TYPE, callback, true);
        }
    }
}

function SessionLoadUrlContent(URL, TYPE, callback, denyMultiple) {
    if (Page_OnUnload_Event)
        if (typeof Window_Unload != "undefined") //20190211 ahh
			Window_Unload();

    var callbackFunc = function () {
        if (callback) {
            callback();
        }

        if (typeof ResponsiveLeftRightView == 'function') {
            ResponsiveLeftRightView();
        }
    };
    
    history.pushState({ url: URL, type: TYPE }, null, null);
    $ContentDiv.ajaxSetup({
        // Disable caching of AJAX responses
        cache: true
    });
    if (typeof denyMultiple != "undefined" && denyMultiple) {
        curXhr = $ContentDiv.ajax({
            url: URL,
            success: function (data) {
                $ContentDiv(document.getElementById(TYPE)).html(data);
            },
            complete: function () { curXhr = null; callbackFunc(); }
        });
    }
    else {
        $ContentDiv(document.getElementById(TYPE)).load(URL, callbackFunc);
    }
    $ContentDiv(document.getElementById(TYPE)).show();
}

function PageMove_Confirm(Flag) {
    if (Flag) {
        if (typeof pBoardID != "undefined" && pBoardID != null)
            pBoardID = "";
        SessionLoadUrlContent(LoadUrlContent_URL, LoadUrlContent_TYPE);
        Write_Flag = false;
        DivPopUpHidden();
    }
}
window.onpopstate = function (event) {
    try {
        var StatePara = JSON.parse(JSON.stringify(event.state));
        if (StatePara.url.replace(/\//g, '') == window.top.location.href.replace(/\//g, '')) {
            window.history.pushState({ url: window.top.location.href }, null, null);
            window.history.pushState({ prevUrl: window.top.location.href }, null, null);
        }
        if (PopUpFlag) {
            history.pushState({ url: StatePara.url, type: StatePara.type }, null, null);
            return;
        }
        if (Write_Flag) {
            LoadUrlContent_URL = StatePara.url;
            LoadUrlContent_TYPE = StatePara.type;
            Confirm_Alert_Message(PageMoveStr, PageMove_Confirm, "");
        }
        else {
            if (StatePara != null && StatePara.type.toUpperCase() == "RIGHTDIV") {
                $ContentDiv('#' + StatePara.type).load(StatePara.url);
                $ContentDiv('#' + StatePara.type).show();
            }
            else
                return;
        }
    } catch (e) { }
};

function SetPageStorage(MODULENAME, LISTID, PAGENUMBER) {
    if (typeof (Storage) != "undefined") {
        sessionStorage.setItem('MODULENAME', MODULENAME);
        sessionStorage.setItem('LISTID', LISTID);
        sessionStorage.setItem('PAGENUMBER', PAGENUMBER);
    }
    else {
        Alert_Message("Sorry! No Web Storage support..", null, "");
        return;
    }
}

function GetPageStorage() {
    var ItemValue = "";
    if (sessionStorage.getItem("MODULENAME") != undefined) {
        ItemValue = sessionStorage.getItem("MODULENAME") + "#" + sessionStorage.getItem("LISTID") + "#" + sessionStorage.getItem("PAGENUMBER");
        DelPageStorage();
    }
    return ItemValue;
}

function DelPageStorage() {
    sessionStorage.removeItem('MODULENAME');
    sessionStorage.removeItem('LISTID');
    sessionStorage.removeItem('PAGENUMBER');
    sessionStorage.clear();
}


function DivPopUpShow_sub(popUpW, popUpH, URL) {
    try {
        var Position = DivPopUpPosition(popUpW, popUpH);
        document.getElementById("iFrameLayer_sub").src = URL;
        document.getElementById("iFramePanel_sub").style.top = Position[0] + "px";
        document.getElementById("iFramePanel_sub").style.left = Position[1] + "px";
        document.getElementById("iFramePanel_sub").style.height = popUpH + "px";
        document.getElementById("iFrameLayer_sub").style.width = popUpW + "px";
        document.getElementById("iFrameLayer_sub").style.height = popUpH + "px";
        document.getElementById("mailPanel_sub").style.display = "";
        document.getElementById("iFramePanel_sub").style.display = "";
    } catch (e) { }
}

function DivPopUpHidden_sub() {
    try {
        document.getElementById("mailPanel_sub").style.display = "none";
        document.getElementById("iFramePanel_sub").style.display = "none";
        document.getElementById("iFrameLayer_sub").src = "/blank.htm";
    } catch (e) { }
}
function CalToDate(p_strCal) {
    return p_strCal.substr(0, 4) + p_strCal.substr(5, 2) + p_strCal.substr(8, 2);
}

function CalToDate2(p_strCal) {
    return p_strCal.substr(0, 4) + "-" + p_strCal.substr(4, 2) + "-" + p_strCal.substr(6, 2);
}

function SetSelectVal(p_strObjId, p_strVal) {
    var Options = document.getElementById(p_strObjId).options;
    var i;
    for (i = 0; i < Options.length; i++) {
        if (Options[i].value == p_strVal) { document.getElementById(p_strObjId).selectedIndex = i; Options[i].selected = true; break; }
    }
}

function SetSelectText(p_strObjId, p_strVal) {
    var Options = document.getElementById(p_strObjId).options;
    var i;
    for (i = 0; i < Options.length; i++) {
        if (Options[i].text == p_strVal) { document.getElementById(p_strObjId).selectedIndex = i; Options[i].selected = true; break; }
    }
}

function GetSelectVal(p_strObjId) {
    return document.getElementById(p_strObjId).options[document.getElementById(p_strObjId).selectedIndex].value;
}

function GetSelectid(p_strObjId) {
    return document.getElementById(p_strObjId).options[document.getElementById(p_strObjId).selectedIndex].id;
}

function GetSelectText(p_strObjId) {
    return document.getElementById(p_strObjId).options[document.getElementById(p_strObjId).selectedIndex].text;
}

function SetRadioVal(p_strObjId, p_strVal) {
    var RadioBtns = document.getElementsByName(p_strObjId);
    var i;
    for (i = 0; i < RadioBtns.length; i++) {
        if (RadioBtns[i].value == p_strVal) { RadioBtns[i].checked = true; break; }
    }
}

function SetRadioNull(p_strObjId) {
    var RadioBtns = document.getElementsByName(p_strObjId);
    var i;
    for (i = 0; i < RadioBtns.length; i++) {
        RadioBtns[i].checked = false;
    }
}

function GetRadioVal(p_strObjId) {
    var RadioBtns = document.getElementsByName(p_strObjId);
    var strReturn = "";
    var i;
    for (i = 0; i < RadioBtns.length; i++) {
        if (RadioBtns[i].checked) { strReturn = RadioBtns[i].value; break; }
    }
    return strReturn;
}

function GetRadioText(p_strObjId) {
    var RadioBtns = document.getElementsByName(p_strObjId);
    var strReturn = "";
    var i;
    for (i = 0; i < RadioBtns.length; i++) {
        if (RadioBtns[i].checked) { strReturn = RadioBtns[i].text; break; }
    }
    return strReturn;
}

function SetCheckVal(p_strObjId, p_strVal) {
    var chkBoxes = document.getElementById(p_strObjId);
    var strCheckVals = p_strVal.split(",");
    var i, j;
    for (i = 0; i < chkBoxes.length; i++) {
        for (j = 0; j < strCheckVals.length; j++) {
            if (chkBoxes[i].value == strCheckVals[j]) {
                chkBoxes[i].checked = true; break;
            }
        }
    }
}

function GetCheckVal(p_strObjId) {
    var chkBoxes = document.getElementById(p_strObjId);
    var strReturn = "";
    var i, j;
    for (i = 0; i < chkBoxes.length; i++) {
        if (chkBoxes[i].checked) {
            strReturn = strReturn + chkBoxes[i].value + ",";
        }
    }
    return (strReturn.length == 0) ? "" : strReturn.substr(0, strReturn.length - 1);
}

function GetCheckText(p_strObjId) {
    var chkBoxes = document.getElementById(p_strObjId);
    var strReturn = "";
    var i, j;
    for (i = 0; i < chkBoxes.length; i++) {
        if (chkBoxes[i].checked) {
            strReturn = strReturn + chkBoxes[i].text + ",";
        }
    }
    return (strReturn.length == 0) ? "" : strReturn.substr(0, strReturn.length - 1);
}

function CheckString(p_strCal, p_strAlert) {
    var isString = 1;
    if (p_strCal == parseInt(p_strCal)) {
        return isString;
    } else {
        isString = 0;
        alert(p_strAlert);
        return isString;
    }
}

function ConvertCharToEntityReference(szData) {
    if (typeof (szData) == "undefined" || szData == null || szData == "") return "";

    var tempStr = new String(szData);
    tempStr = ReplaceText(tempStr, "&", "&amp;");
    tempStr = ReplaceText(tempStr, "<", "&lt;");
    tempStr = ReplaceText(tempStr, ">", "&gt;");
    return tempStr;
}

function ConvertEntityReferenceToChar(szData) {
    if (typeof (szData) == "undefined" || szData == null || szData == "") return "";

    var tempStr = new String(szData);
    tempStr = ReplaceText(tempStr, "&gt;", ">");
    tempStr = ReplaceText(tempStr, "&lt;", "<");
    tempStr = ReplaceText(tempStr, "&amp;", "&");
    return tempStr;
}

function ConvertStringForHTML(szData) {
    if (typeof (szData) == "undefined" || szData == null || szData == "") return "";

    var tempStr = new String(szData);

    tempStr = ReplaceText(tempStr, "&", "&amp;");
    tempStr = ReplaceText(tempStr, "<", "&lt;");
    tempStr = ReplaceText(tempStr, ">", "&gt;");
    tempStr = ReplaceText(tempStr, " ", "&nbsp;");

    return tempStr;
}

function Replace2HTML(orgStr) {
    var tempStr = new String(orgStr);
    tempStr = ReplaceText(tempStr, "&", "&amp;");
    tempStr = ReplaceText(tempStr, String.fromCharCode(9), "&nbsp;&nbsp;&nbsp;&nbsp;");
    tempStr = ReplaceText(tempStr, "<", "&lt;");
    tempStr = ReplaceText(tempStr, ">", "&gt;");
    tempStr = ReplaceText(tempStr, String.fromCharCode(13), "<BR>");
    tempStr = ReplaceText(tempStr, " ", "&nbsp;");
    return tempStr;
}

function ReplaceText(orgStr, findStr, replaceStr) {
    var re = new RegExp(findStr, "gi");
    return (orgStr.replace(re, replaceStr));
}

function Mark1000Sep(p_nMoney) {
    var strReturn = "";
    var nHeadCnt;
    var strAll = new String(p_nMoney);
    var strRight = (strAll.indexOf(".") >= 0 ? strAll.substr(strAll.indexOf("."), strAll.length) : "");
    var strMoney = (strAll.indexOf(".") >= 0 ? strAll.substr(0, strAll.indexOf(".")) : strAll);
    strMoney = strMoney.replace(/,/g, "");
    var nCommaCnt = Math.floor((strMoney.length - 1) / 3);
    nHeadCnt = strMoney.length - nCommaCnt * 3
    for (i = nCommaCnt; i >= 0; i--) {
        if (i == nCommaCnt) strReturn = strReturn + strMoney.substr(0, nHeadCnt);
        else strReturn = strReturn + "," + strMoney.substr(nHeadCnt + (nCommaCnt - i - 1) * 3, 3);
    }
    strReturn = strReturn + (strRight != "" ? strRight : "");
    return strReturn;
}

function Remove1000Sep(p_nMoney) {
    return p_nMoney.replace(/,/g, "");
}

function CheckTimeRevision(szTime) {
    if (parseInt(szTime) == 0) {
        szTime = "00";
    } else if (parseInt(szTime) > 0 && parseInt(szTime) < 10) {
        szTime = "0" + szTime;
    }

    return szTime;
}

function CheckStartDateOnly(p_objCal) {
    if (p_objCal == "" || p_objCal == null) p_objCal = idDatepicker;
    start = p_objCal.startFullYear + "-"
        + CheckTimeRevision((parseInt(p_objCal.startMonth) + 1)) + "-"
        + CheckTimeRevision(p_objCal.startDate);

    end = p_objCal.endFullYear + "-"
        + CheckTimeRevision((parseInt(p_objCal.endMonth) + 1)) + "-"
        + CheckTimeRevision(p_objCal.endDate);

    if (start < end)
        return false;
    else
        return true;
}

function CheckNull(toCheck) {
    var chkstr = toCheck + "";
    var is_Space = true;
    if ((chkstr == "") || (chkstr == null))
        return (true);

    for (j = 0; is_Space && (j < chkstr.length); j++) {
        if (chkstr.substring(j, j + 1) != " ") {
            is_Space = false;
        }
    }
    return (is_Space);
}

function CheckNumber(toCheck) {
    var chkstr = toCheck + "";
    toCheck = toCheck.replace(/,/g, "");
    var isNum = true;

    if (CheckNull(toCheck))
        return false;

    for (j = 0; isNum && (j < toCheck.length); j++) {
        if ((toCheck.substring(j, j + 1) < "0") || (toCheck.substring(j, j + 1) > "9")) {
            if (toCheck.substring(j, j + 1) == "-" || toCheck.substring(j, j + 1) == "+") {
                if (j != 0) {
                    isNum = false;
                }
            }
            else
                isNum = false;
        }
    }
    if (chkstr == "+" || chkstr == "-") isNum = false;
    return isNum;
}

function input_check() {
    var ICheck = document.all.tags("input");
    if (ICheck != null) {
        for (i = 0; i < ICheck.length; i++) {
            if ((ICheck[i].value == null) || (ICheck[i].value == ""))
                ICheck[i].value = "-";
        }
    }
    var TCheck = document.all.tags("TEXTAREA");
    if (TCheck != null) {
        for (j = 0; j < TCheck.length; j++) {
            if ((TCheck[j].value == null) || (TCheck[j].value == ""))
                TCheck[j].value = "-";
        }
    }
}

function get_length(chkstr) {
    var length = 0;
    var i;

    for (i = 0; i < chkstr.length; i++)
        if (chkstr.charCodeAt(i) > 256)
            length = length + 2;
        else
            length++;

    return length;
}

function DateFormat(obj) {
    var yy = String(obj.getFullYear()).substring(0, 4);
    if (String(obj.getMonth() + 1).length == 1) {
        var mm = "0" + (obj.getMonth() + 1);
    }
    else {
        var mm = obj.getMonth() + 1;
    }
    if (String(obj.getDate()).length == 1) {
        var dd = "0" + obj.getDate();
    }
    else {
        var dd = obj.getDate();
    }
    var date = String(yy) + "-" + String(mm) + "-" + String(dd);
    return date;
}

function fnCalStartDateSet(p_objCal, p_newVal) {
    p_objCal.startFullYear = parseInt(p_newVal.substr(0, 4), 10);
    p_objCal.startMonth = parseInt(p_newVal.substr(5, 2), 10) - 1;
    p_objCal.startDate = parseInt(p_newVal.substr(8, 2), 10);
    return;
}

function fnCalEndDateSet(p_objCal, p_newVal) {
    p_objCal.endFullYear = parseInt(p_newVal.substr(0, 4), 10);
    p_objCal.endMonth = parseInt(p_newVal.substr(5, 2), 10) - 1;
    p_objCal.endDate = parseInt(p_newVal.substr(8, 2), 10);
    return;
}

function CalDateSet(p_objCal, p_newVal1, p_newVal2) {
    p_objCal.startFullYear = parseInt(p_newVal1.substr(0, 4), 10);
    p_objCal.startMonth = parseInt(p_newVal1.substr(5, 2), 10) - 1;
    p_objCal.startDate = parseInt(p_newVal1.substr(8, 2), 10);

    if (p_newVal2 == "") return;
    p_objCal.endFullYear = parseInt(p_newVal2.substr(0, 4), 10);
    p_objCal.endMonth = parseInt(p_newVal2.substr(5, 2), 10) - 1;
    p_objCal.endDate = parseInt(p_newVal2.substr(8, 2), 10);
    return;
}


function CalDateSet1(p_objCal, p_newVal1, p_newVal2) {
    p_objCal.startFullYear = parseInt(p_newVal1.substr(0, 4), 10);
    p_objCal.startMonth = parseInt(p_newVal1.substr(4, 2), 10) - 1;
    p_objCal.startDate = parseInt(p_newVal1.substr(6, 2), 10);

    if (p_newVal2 == "") return;
    p_objCal.endFullYear = parseInt(p_newVal2.substr(0, 4), 10);
    p_objCal.endMonth = parseInt(p_newVal2.substr(4, 2), 10) - 1;
    p_objCal.endDate = parseInt(p_newVal2.substr(6, 2), 10);
    return;
}

function getToday() {
    var d = new Date();
    var strTime;
    strTime = d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate();
    return strTime;
}

function Button_Check(p_objRadio) {
    var strObj = document.getElementById(p_objRadio);
    var i = 0;
    for (i = 0; i < strObj.length; i++) {
        if (strObj[i].checked == true) {
            return i;
        }
    }
}

function C_Check(p_objRadio, p_check) {
    var i = 0;
    var strObj = document.getElementById(p_objRadio);
    for (i = 0; i < strObj.length; i++) {
        if (strObj[i].value == p_check) {
            strObj[i].checked = true;
        }
    }
}

function LenUnicode(pstrUnicode) {
    var intLenCnt = 0;
    var i;
    for (i = 0; i < pstrUnicode.length; i++)
        if (pstrUnicode.charCodeAt(i) < 128)
            intLenCnt += 1;
        else
            intLenCnt += 2;
    return intLenCnt
}


function trim(value) { //20180611 ahh Chrome에서 trim 정상동작하지 않는 케이스 발생하여 Cross용으로 변경
    value = String(value);
    value = value.trim();
    if (value == null || value == "undefined" || value == "" || value == "\n") {
        return "";
    }
    return value.trim();
    //if (parm_str == "")
    //    return ""
    //else
    //    return rtrim(ltrim(parm_str));
}

function ltrim(parm_str) {
    str_temp = parm_str;

    while (str_temp.length != 0) {
        if (str_temp.substring(0, 1) == " ") {
            str_temp = str_temp.substring(1, str_temp.length);
        } else {
            return str_temp;
        }
    }
    return str_temp;
}

function rtrim(parm_str) {
    str_temp = parm_str;

    while (str_temp.length != 0) {
        int_last_blnk_pos = str_temp.lastIndexOf(" ");

        if ((str_temp.length - 1) == int_last_blnk_pos) {
            str_temp = str_temp.substring(0, str_temp.length - 1);
        } else {
            return str_temp;
        }
    }
    return str_temp;
}

function AddOption(objselect, objtext, objvalue) {
    var objOption = document.createElement("OPTION");
    objOption.text = objtext;
    objOption.value = objvalue;
    objselect.add(objOption);
}

function MakeXMLString(pOrgString) {
    if (typeof(pOrgString) == "undefined" || pOrgString == undefined) {
        return "";
    }
    return ReplaceText(ReplaceText(ReplaceText(pOrgString, "&", "&amp;"), "<", "&lt;"), ">", "&gt;");
}

function CompareDate(sdate, edate) {
    if (edate - sdate < 0)
        return false;
    else
        return true;
}

function getHourInterval(time1, time2) {
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);
    var hour = 1000 * 3600;

    var returnval = parseFloat((date2 - date1) / hour);
    return returnval.toFixed(2);
}

function toTimeObject(time) {
    var year = time.substr(0, 4);
    var month = time.substr(4, 2) - 1;
    var day = time.substr(6, 2);
    var hour = time.substr(8, 2);
    var min = time.substr(10, 2);
    return new Date(year, month, day, hour, min);
}

function formatDate(d) {
    return new Date(d.substr(0, 4), Number(d.substr(4, 2)) - 1, Number(d.substr(6)));
}

function OnlyNum() {
    if ((event.keyCode < 48) || (event.keyCode > 57))
        event.returnValue = false;
}

function ChkNum(obj, msg) {
    if (obj.value == "") {
        alert(msg);
        obj.focus();
        return (1);
    }
    else {
        for (i = 0; i < obj.value.length; i++) {
            chr = obj.value.charAt(i);
            if (!(chr >= "0" && chr <= "9")) {
                alert(msg);
                obj.focus();
                return (1);
            }
        }
    }
}

function is_num(data) {
    var temp = "";
    var nLen = data.length;
    for (var i = 0; i < nLen; i++) {
        temp = data.substring(i, i + 1);
        if (temp < "0" || temp > "9")
            return false;
    }
    return true;
}

function GetPlusDate(targetDate, PlusDayInt) {
    var newDate = new Date();
    var returnDate = targetDate.getTime() - (parseInt(PlusDayInt) * 24 * 60 * 60 * 1000);
    newDate.setTime(returnDate);
    return newDate;
}

function TimeToStr(targetDate) {
    var strTime;
    var strYear = targetDate.getFullYear();
    var strMonth = targetDate.getMonth() + 1
    var strDay = targetDate.getDate();
    if (strMonth < 10)
        strMonth = "0" + strMonth;
    if (strDay < 10)
        strDay = "0" + strDay;

    strTime = strYear + "-" + strMonth + "-" + strDay;
    return strTime;
}

function getAbsoluteHeight(el) {
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    if (el == null) {
        return 0;
    }

    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
    return Math.ceil(el.offsetHeight + margin);
}

function getAbsoluteWidth(el) {
    el = (typeof el === 'string') ? document.querySelector(el) : el;
    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginLeft']) + parseFloat(styles['marginRight']);
    return Math.ceil(el.offsetWidth + margin);
}

function HTMLtoMHT_MakeTag(ContnetHTML) {
    var HTML = document.createElement("HTML");
    var HEAD = document.createElement("HEAD");
    var META = document.createElement("META");
    META.content = "text/html; charset=utf-8";
    META.httpEquiv = "Content-Type";
    HEAD.appendChild(META);

    var STYLE = document.createElement("STYLE");
    STYLE.type = "text/css";

    try {
        STYLE.innerHTML = "P { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "DIV { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; }"
            + "TD { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "UL { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "OL { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "LI { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "BODY { MARGIN-RIGHT: 10px; FONT-SIZE:10PT; LINE-HEIGHT:1.3; } "
            + "TABLE TD { text-indent: 0px } "
            + "BLOCKQUOTE { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px;}";
    } catch (e) {
        STYLE.styleSheet.cssText = "P { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "DIV { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; }"
            + "TD { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "UL { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "OL { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "LI { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px; MARGIN-LEFT: 0px; } "
            + "BODY { MARGIN-RIGHT: 10px; FONT-SIZE:10PT; LINE-HEIGHT:1.3; } "
            + "TABLE TD { text-indent: 0px } "
            + "BLOCKQUOTE { MARGIN-TOP: 0px; MARGIN-BOTTOM: 0px;}";
    }
    HEAD.appendChild(STYLE);
    HTML.appendChild(HEAD);
    var BODY = document.createElement("BODY");
    BODY.appendChild(ContnetHTML);
    HTML.appendChild(BODY);
    return HTML.outerHTML;
}

function MACSAFARIYN() {
    var result = true;
    if (navigator.userAgent.toUpperCase().indexOf("MACINTOSH") > -1) {
        if (navigator.userAgent.toUpperCase().indexOf("CHROME") > -1) {
            result = false;
        } else {
            result = true;
        }
    } else {
        result = false;
    }
    return result;
}

function CustomRandom() {
    var now = new Date();
    var seed = now.getMilliseconds();
    return Math.random(seed) + 1;
}

function S4() {
    return ((CustomRandom() * 0x10000) | 0).toString(16).substring(1);
}

function GetGUID() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function DelComment(pContent) {
    pContent = ReplaceAll(pContent, "<!--[if-->", "");
    pContent = ReplaceAll(pContent, "<!--![if-->", "");
    pContent = ReplaceAll(pContent, "&lt;!--[if--&gt;", "");
    pContent = ReplaceAll(pContent, "&lt;!--![if--&gt;", "");
    pContent = ReplaceAll(pContent, "<!--[endif]-->", "");
    pContent = ReplaceAll(pContent, "<!--![endif]-->", "");
    pContent = ReplaceAll(pContent, "&lt;!--[endif]--&gt;", "");
    pContent = ReplaceAll(pContent, "&lt;!--![endif]--&gt;", "");
    return pContent;
}

function convertRadix16(orgNum) {
    var copyNum;
    if (orgNum < 0) {
        orgNum = -orgNum;
        copyNum = 65536 - orgNum;
        return copyNum.toString(16);
    }
    return orgNum.toString(16);
}

function convertRadix10(orgHex) {
    var copyNum = String(orgHex);
    var i;
    var tempVal = 0;
    var retVal = 0;
    for (i = 0; i < copyNum.length; i++) {
        tempVal = HexToDec(copyNum.charAt(i));
        tempVal = tempVal * Math.pow(16, copyNum.length - i - 1);
        retVal += tempVal;
    }
    return retVal;
}

function makeString(strLen, empCh, custStr) {
    var index;
    var szEmpty = "";
    for (index = custStr.length; index < strLen; index++) {
        szEmpty += empCh;
    }
    return (szEmpty + custStr);
}


function HexToDec(orgHex) {
    var numVal = Number(orgHex);
    var chVal = String(orgHex).toUpperCase();

    if (isNaN(numVal)) {
        switch (chVal) {
            case "A":
                numVal = 10;
                break;
            case "B":
                numVal = 11;
                break;
            case "C":
                numVal = 12;
                break;
            case "D":
                numVal = 13;
                break;
            case "E":
                numVal = 14;
                break;
            case "F":
                numVal = 15;
                break;
        }
    }
    return numVal;
}

function decodeUTF8Encode(szInput) {
    var i;
    var ch, uch, code, uVal;
    var szRet = "";
    var wch1 = 0, wch2 = 0, wch3 = 0;
    var wstep = 0;
    var uch1, uch2, uch3;
    for (i = 0; i < szInput.length; i++) {
        ch = szInput.charAt(i);
        uch = "";

        if (ch == '%') {
            uch += szInput.charAt(++i);
            uch += szInput.charAt(++i);
        } else {
            szRet += ch;
            continue;
        }
        uVal = convertRadix10(uch);
        if (uVal <= 125) {
            szRet += String.fromCharCode(uVal);
        } else {
            switch (wstep) {
                case 0:
                    wch1 = uVal;
                    wstep = 1;
                    break;
                case 1:
                    wch2 = uVal;
                    wstep = 2;
                    break;
                case 2:
                    wch3 = uVal;
                    wstep = 0;
                    uch1 = wch3 & 0x7F;
                    uch2 = (wch2 & 0x7F) << 6;
                    uch3 = (wch1 & 0x1F) << 12;
                    szRet += String.fromCharCode(uch1 + uch2 + uch3);
                default:
                    wstep = 0;
            }
        }
    }
    return szRet;
}

function ExtractBetweenPattern(orgStr, firstPattern, lastPattern) {
    var sIndex, eIndex;
    var copyStr = new String(orgStr);
    var retStr = "", subStr;
    var regFExp = new RegExp(firstPattern, "i");
    var regEExp = new RegExp(lastPattern, "i");
    var loop = 0;

    sIndex = copyStr.search(regFExp);
    if (sIndex == -1) {
        return orgStr;
    }

    copyStr = copyStr.substr(sIndex + firstPattern.length);

    eIndex = copyStr.search(regEExp);
    if (eIndex == -1) {
        return copyStr;
    }
    retStr = copyStr.substr(0, eIndex);
    return retStr;
}

function CutBeforeText(orgText, findText) {
    var tempStr = new String(orgText);
    var findStr = new String(findText);

    tempStr = tempStr.toUpperCase();
    findStr = findStr.toUpperCase();
    var indexPos = tempStr.indexOf(findStr);
    return (orgText.substr(indexPos + findText.length));
}

function CutAfterText(orgText, findText) {
    var indexPos = orgText.lastIndexOf(findText);
    return (orgText.substr(0, indexPos));
}

function openAttachView(wfileLocation, wName, wWeigth, wHeigth) {
    try {
        var heigth = window.screen.availHeight;
        var width = window.screen.availWidth;

        var left = 0;
        var top = 20;

        if (window.screen.width > 800) {
            var pleftpos;

            pleftpos = parseInt(width) - 967;
            heigth = parseInt(heigth) - 100;
            width = parseInt(width) - pleftpos;

            left = pleftpos / 2;
        } else {

            heigth = parseInt(heigth) - 100;
            width = parseInt(width) - 10;
        }
        window.open(wfileLocation, wName, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,height=" + heigth + ",width=" + width + ",top=" + top + ",left = " + left);
    } catch (e) {
        alert("openAttachView :: " + e.description);
    }
}

function EmbedContentIntoXML(ConValue) {
    var tempDiv = document.createElement("DIV");
    tempDiv.innerHTML = ConValue;

    var imgColl = tempDiv.getElementsByTagName("IMG");
    for (var i = 0; i < imgColl.length; i++) {
        if (imgColl.item(i).src.toLowerCase().indexOf("upload_common") > 0) {
            var OrgSrc = imgColl.item(i).src;
            var ImgHeight = "0";
            var ImgWidth = "0";

            var result = imgColl.item(i).style.width != "" ? imgColl.item(i).style.width : imgColl.item(i).width;
            if (result.toString().indexOf("px") > -1) result = result.replace("px", "");
            if (result != null) ImgWidth = result;

            var result = imgColl.item(i).style.width != "" ? imgColl.item(i).style.height : imgColl.item(i).height;
            if (result.toString().indexOf("px") > -1) result = result.replace("px", "");
            if (result != null) ImgHeight = result;

            ConvertSaveImageFile(OrgSrc, ImgWidth, ImgHeight);
        }

    }
    var BodyHTMLContent = tempDiv.innerHTML;
    return BodyHTMLContent;
}

function ConvertSaveImageFile(pUrl, pImgWidth, pImgHeight) {
    var XmlHttp = createXMLHttpRequest();
    var xmlDom = createXmlDom();
    var objNode;
    createNodeInsert(xmlDom, objNode, "DATA");
    createNodeAndInsertText(xmlDom, objNode, "URL", encodeURIComponent(pUrl));
    createNodeAndInsertText(xmlDom, objNode, "HEIGHT", pImgHeight);
    createNodeAndInsertText(xmlDom, objNode, "WIDTH", pImgWidth);
    createNodeAndInsertText(xmlDom, objNode, "TYPE", "2");
    try {
        XmlHttp.open("POST", "/myoffice/Common/ConvertSaveImage.aspx", false);
        XmlHttp.send(xmlDom);
    }
    catch (e) { }
}

function removeDatePicker(_pID) {
    $ContentDiv("#" + _pID).remove();
    $ContentDiv(".ui-datepicker-trigger").remove();
    $ContentDiv(".DatePicker_class").removeClass('hasDatepicker');
}

// Left Menu, Tab Menu
var currentListNum;
var level1El;
var level2El;
var level3El;
function initToggleList(ulEl, level1, level2, level3) {
    currentListNum = true;
    level1El = ulEl.getElementsByTagName(level1);
    level2El = ulEl.getElementsByTagName(level2);
    level3El = ulEl.getElementsByTagName(level3);

    for (var i = 0; i < level1El.length; i++) {
        level1El.item(i).listNum = i;
        level1El.item(i).onclick = new Function("toggleList(this);");
    }

    for (var j = 0; j < level3El.length; j++) {
        level3El.item(j).onclick = new Function("toggleList_Sub(this);");
    }
    level1El.item(0).className = "on";
}

var Left_h2;
var LeftMenu_ClickNum;
function Init_LeftMenu_Event() {
    var LeftMenu_Element = document.getElementById("left");
    Left_h2 = LeftMenu_Element.getElementsByTagName("h2");
    for (var i = 0; i < Left_h2.length; i++) {
        Left_h2.item(i).listNum = i;
        Left_h2.item(i).onclick = new Function("LeftMenu_H2_Class(this);");
    }

    if (Left_h2.length > 0) {
        Left_h2.item(0).className = "on";
        LeftMenu_ClickNum = 0;
    }
}

function Init_LeftMenu_Event_Board() {
    var LeftMenu_Element = document.getElementById("left");
    Left_h2 = LeftMenu_Element.getElementsByTagName("h2");
    for (var i = 0; i < Left_h2.length; i++) {
        Left_h2.item(i).listNum = i;
        Left_h2.item(i).onclick = new Function("LeftMenu_H2_Class_Board(this);");
    }

    if (Left_h2.length > 0) {
        Left_h2.item(0).className = "on";
        LeftMenu_ClickNum = 0;
    }
}

function LeftMenu_H2_Class(obj) {
    var LeftMenu_Element = document.getElementById("left");
    Left_h2 = LeftMenu_Element.getElementsByClassName("on");
    var isThis = false;

    for (var i = 0; i < Left_h2.length; i++) {
		if(Left_h2.item(i).tagName === "H2") {
			if (Left_h2.item(i) === obj) {
				if (obj.className === "on") {
					obj.className = "";
					LeftMenu_ClickNum = null;
					isThis = true;
				}
			}
			else {
				Left_h2.item(i).className = "";
			}
		}
    }

    if (!isThis) {
        obj.className = "on";
        LeftMenu_ClickNum = obj.listNum;
    }
}

function LeftMenu_H2_Class_Board(obj) {
    var LeftMenu_Element = document.getElementById("left");
    Left_h2 = LeftMenu_Element.getElementsByClassName("on");
    var isThis = false;

    for (var i = 0; i < Left_h2.length; i++) {
        if (Left_h2.item(i).tagName === "H2") {
            if (Left_h2.item(i) === obj) {
                if (obj.className === "on") {
                    obj.className = "";
                    LeftMenu_ClickNum = null;
                    isThis = true;
                }
            }
            else {
            	Left_h2.item(i).className = "";
            }
        }
    }

    if (!isThis) {
        obj.className = "on";
        LeftMenu_ClickNum = obj.listNum;
    }
}

function toggleList(obj) {
    if (currentListNum && currentListNum != obj.listNum + 1) {
        level1El.item(currentListNum - 1).className = "";
    }

    var itemId = level2El.item(obj.listNum).previousSibling.id;
    if (level2El.item(obj.listNum).className == "on") { 
        level1El.item(obj.listNum).className = "";
    }
    else {
        level1El.item(obj.listNum).className = "on";
        if (level1El.item(obj.listNum).children.length > 0 && level1El.item(obj.listNum).children[0].id != undefined && level1El.item(obj.listNum).children[0].id != "") {
            if (!CrossYN())
                level1El.item(obj.listNum).children[0].onclick();
            else
                level1El.item(obj.listNum).children[0].onclick;
        }
    }
    currentListNum = obj.listNum + 1;
    setMenu(level2El.item(obj.listNum));
}

function toggleList_Sub(obj) {
    if (level3El != undefined) {
        for (var j = 0; j < level3El.length; j++) {
            level3El.item(j).className = "";
        }
    }

    if (selTabEI != undefined) {
        for (var i = 0; i < selTabEI.length; i++) {
            selTabEI.item(i).className = "";
        }
    }
    obj.className = "on";
}

function setMenu(obj) {
    var subTags = obj.getElementsByTagName("li");
    for (var j = 0; j < level3El.length; j++) {
        level3El.item(j).className = "";
    }
    if (subTags.item(0) != null)
        subTags.item(0).className = "on";
}

var selTabEI;
function selToggleList(TabElement) {
    if(TabElement.getElementsByTagName("dt").length > 0)
        selTabEI = TabElement.getElementsByTagName("dt");
    else if (TabElement.getElementsByTagName("li").length > 0)
        selTabEI = TabElement.getElementsByTagName("li");

    for (var j = 0; j < selTabEI.length; j++) {
        selTabEI.item(j).onclick = new Function("toggleList_Sub(this);");
    }
    selTabEI.item(0).className = "on";
}

function selToggleList_Multi(TabElement, TabElement_sub) {
    if (typeof (TabElement) === "object" && TabElement != null) {
        var _selTabEI = "";
        if (TabElement.getElementsByTagName("dt").length > 0)
            _selTabEI = TabElement.getElementsByTagName("dt");
        else if (TabElement.getElementsByTagName("li").length > 0)
            _selTabEI = TabElement.getElementsByTagName("li");

        for (var j = 0; j < _selTabEI.length; j++) {
            //_selTabEI.item(j).onclick = new Function("toggleList_Sub_Multi(\"" + TabElement.id + "\", this);");
            if (typeof (TabElement_sub) === "object" && TabElement_sub != null)
                _selTabEI.item(j).addEventListener("click", function () { toggleList_Sub_Multi(TabElement.id, this, TabElement_sub.id); });
            else
                _selTabEI.item(j).addEventListener("click", function () { toggleList_Sub_Multi(TabElement.id, this); });
        }

        if (typeof (TabElement_sub) === "undefined")
            _selTabEI.item(0).className = "on";
    }
}

function toggleList_Sub_Multi(TabElement_ID, obj, TabElement_sub_ID) {
    if (typeof openWindowMultiView_Obj === "object" && openWindowMultiView_Obj !== null) {
        return;
    }

    var _selTabEI = "";
    var TabElement = document.getElementById(TabElement_ID);

    if (TabElement.getElementsByTagName("dt").length > 0)
        _selTabEI = TabElement.getElementsByTagName("dt");
    else if (TabElement.getElementsByTagName("li").length > 0)
        _selTabEI = TabElement.getElementsByTagName("li");

    var _selTabEI_sub = "";
    if (typeof (TabElement_sub_ID) != 'undefined') {
        var TabElement_sub = document.getElementById(TabElement_sub_ID);
        if (typeof (TabElement_sub) === "object" && TabElement_sub != null) {
            if (TabElement_sub.getElementsByTagName("dt").length > 0)
                _selTabEI_sub = TabElement_sub.getElementsByTagName("dt");
            else if (TabElement_sub.getElementsByTagName("li").length > 0)
                _selTabEI_sub = TabElement_sub.getElementsByTagName("li");

            for (var i = 0; i < _selTabEI_sub.length; i++) {
                //_selTabEI_sub.item(i).className = "";
                _selTabEI_sub.item(i).classList.remove("on");
                if (obj.id == _selTabEI_sub.item(i).id) {
                    //_selTabEI_sub.item(i).className = "on";
                    _selTabEI_sub.item(i).classList.add("on");
                }
            }
        }
    }

    for (var i = 0; i < _selTabEI.length; i++) {
        //_selTabEI.item(i).className = "";
        _selTabEI.item(i).classList.remove("on");
    }
    //obj.className = "on";
    obj.classList.add("on");
}
// Left Menu, Tab Menu

// QuickMenu 
var QuickcurNum = 0;
var QuickBlockNum = 8;
function QuickMove(value) {
    var totalcnt = document.getElementById('QuickUl').getElementsByTagName('li').length;
    if (value == "DOWN") {
        if (totalcnt > QuickcurNum + QuickBlockNum) {
            document.getElementById('QuickUl').getElementsByTagName('li')[QuickcurNum].style.display = "none";
            document.getElementById('QuickUl').getElementsByTagName('li')[QuickcurNum + QuickBlockNum].style.display = "block";
            QuickcurNum++;
        }
    }
    else {
        if (QuickcurNum > 0) {
            QuickcurNum--;
            document.getElementById('QuickUl').getElementsByTagName('li')[QuickcurNum].style.display = "block";
            document.getElementById('QuickUl').getElementsByTagName('li')[QuickcurNum + QuickBlockNum].style.display = "none";
        }
    }
}

var OpenFlag = false;
function hiddenQuick() {
    if (!OpenFlag) {
        document.getElementById("btn_quick_Up").style.display = "none";
        document.getElementById("QuickUl").style.display = "none";
        document.getElementById("btn_quick_Down").style.display = "none";
        OpenFlag = true;
    }
    else {
        document.getElementById("btn_quick_Up").style.display = "block";
        document.getElementById("QuickUl").style.display = "block";
        document.getElementById("btn_quick_Down").style.display = "block";
        OpenFlag = false;
    }
}

function openURL(Location, SIZE) {
    try {
        var heigth = window.screen.availHeight;
        var width = window.screen.availWidth;
        var left = 0;
        var top = 0;
        if (window.screen.width > 800) {
            var pleftpos = parseInt(width) - 967;
            heigth = parseInt(heigth) - 30;
            width = parseInt(width) - pleftpos;
            left = pleftpos / 2;
        } else {
            heigth = parseInt(heigth) - 30;
            width = parseInt(width) - 10;
        }
        if (SIZE == "FULL")
            window.open(Location, "", "toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,height=" + screen.height + ",width=" + screen.width + ",top=0,left=0");
        else
            window.open(Location, "", "toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,height=" + SIZE.split(':')[1] + ",width=" + SIZE.split(':')[0] + ",top=" + top + ",left = " + left);

    } catch (e) {
        alert("openwindow :: " + e.description);
    }
}

var OrganFlag = false;
function GetPageType() {
    var result = "LOAD";
    if (!OrganFlag) {
        var oParams = getUrlParams();
        if (typeof (oParams.PAGETYPE) == "undefined") {
            result = "LOAD";
        }
        else {
            result = oParams.PAGETYPE;
        }
    }
    OrganFlag = false;
    return result;
}

function PopupStyleShow() {
    try {
        if (GetPageType() == "LAYER") {
            document.getElementById("popupTitle").style.display = "";
            document.getElementById("embed_Open").style.display = "";
            document.getElementById("embed_Close").style.display = "none";
            document.getElementById("LayerPopupLayout").style.marginTop = "";
        }
        else if (GetPageType() == "POPUP") {
            document.getElementById("popupTitle").style.display = "none";
            document.getElementById("LayerPopupLayout").style.marginTop = "0px";
            document.getElementById("embed_Open").style.display = "none";
            document.getElementById("embed_Close").style.display = "none";
        }
        else {
            document.getElementById("popupTitle").style.display = "none";
            document.getElementById("LayerPopupLayout").style.marginTop = "0px";
            document.getElementById("embed_Open").style.display = "";
            document.getElementById("embed_Close").style.display = "";
        }
    }
    catch (e) { }
}

function addQueryParam(url, key, val) {
    var parts = url.match(/([^?#]+)(\?[^#]*)?(\#.*)?/);
    var url = parts[1];
    var qs = parts[2] || '';
    var hash = parts[3] || '';

    if (!qs) {
        return url + '?' + key + '=' + encodeURIComponent(val) + hash;
    } else {
        var qs_parts = qs.substr(1).split("&");
        var i;
        for (i = 0; i < qs_parts.length; i++) {
            var qs_pair = qs_parts[i].split("=");
            if (qs_pair[0] == key) {
                qs_parts[i] = key + '=' + encodeURIComponent(val);
                break;
            }
        }
        if (i == qs_parts.length) {
            qs_parts.push(key + '=' + encodeURIComponent(val));
        }
        return url + '?' + qs_parts.join('&') + hash;
    }
}

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
    return params;
}

function LayerYN() {
    var result = true;
    if (parent && parent != this) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function initPopUpSetting(_title) {
    try {
        if (GetPageType() == "LAYER") {
            //document.getElementById("embed_Open").style.display = "none";
            document.getElementById("embed_Open").style.display = "";
            document.getElementById("embed_Close").style.display = "";            
        }
        else if (GetPageType() == "POPUP") {
            if (document.getElementsByTagName("title").lenght > 0) {
                document.getElementsByTagName("title")[0].innerHTML = _title;
            }
            document.getElementById("embed_Open").style.display = "none";
            document.getElementById("embed_Close").style.display = "";
        }
        else {
            document.getElementById("embed_Open").style.display = "";
            document.getElementById("embed_Close").style.display = "";
        }
    } catch (e) { }
}

function Append_NoData(ElementID) {
    var noDataDiv = document.createElement("div");
    noDataDiv.className = "nodataBox";

    var ImgP = document.createElement("p")
    ImgP.className = "icon_nodata";

    var TextP = document.createElement("p");
    TextP.className = "text_nodata";
    TextP.innerText = "No data.";

    noDataDiv.appendChild(ImgP);
    noDataDiv.appendChild(TextP);
    document.getElementById(ElementID).appendChild(noDataDiv);
}

function jscssfile_removecheck() {
    // js, css 파일 include 중복 구문 제거
    var pLinkElems = document.getElementsByTagName("link");
    var element;
    for (var i = 0; i < pLinkElems.length; i++) {
        var pLinkSrc = pLinkElems[i].getAttribute("href");
        var pLinkThisElems = document.querySelectorAll("link[href='" + pLinkSrc + "']");
        if (pLinkThisElems.length > 1) {
            for (var j = 1; j < pLinkThisElems.length; j++) {
                element = pLinkThisElems[j];
                element.parentNode.removeChild(element);
            }
        }
    }

    var pScriptElems = document.getElementsByTagName("script");
    for (var i = 0; i < pScriptElems.length; i++) {
        var pScriptSrc = pScriptElems[i].getAttribute("src");
        var pScriptThisElems = document.querySelectorAll("script[src='" + pScriptSrc + "']");
        if (pScriptThisElems.length > 1) {
            for (var j = 1; j < pScriptThisElems.length; j++) {
                element = pScriptThisElems[j];
                element.parentNode.removeChild(element);
            }
        }
    }
}

// js, css파일 include 함수
// 현재창에 없을 경우 script, link태그 생성
// parameter { filename : 참조파일 경로 }
//           { filetype : js / css }
//           { onloadscript : 참조파일 로드 완료시 실행함수 }
// 호출 예시 : loadjscssfile("<%= MakeFileVersionPath("/JQuery/jquery-1.9.1.min.js") %>", "js", "$ContentDiv = jQuery.noConflict();loadjscssfile(\"" + afterJqueryInclude + "\", \"js\");");
function loadjscssfile(filename, filetype, onloadscript) {
    var fileref = null;
    if (filetype == "js") { //if filename is a external JavaScript file
        if (document.querySelectorAll("script[src='" + filename + "']").length === 0) {
            fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
            fileref.onload = function () {
                Function(onloadscript)();
            };
        }
    }
    else if (filetype == "css") { //if filename is an external CSS file
        if (document.querySelectorAll("link[src='" + filename + "']").length === 0) {
            fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
    }

    if (fileref != null && typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}
/* Debounce Resize */
/* Resize 성능 개선 */
function debouncer(func, ptimeout) {
    var timeoutID, timeout = ptimeout || 100;
    return function () {
        var scope = this, args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function () {
            func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    };
}

function checkLoaderLayer() {
    var rtnValue = false;

    try {
        var divElem_Main_mailPanel = null;
        if (document.getElementById("Main_mailPanel") == null) {
            divElem_Main_mailPanel = document.createElement("DIV");
            divElem_Main_mailPanel.id = "Main_mailPanel";
            divElem_Main_mailPanel.style.width = "100%";
            divElem_Main_mailPanel.style.height = "100%";
            divElem_Main_mailPanel.style.position = "fixed";
            divElem_Main_mailPanel.style.top = "0";
            divElem_Main_mailPanel.style.left = "0";
            divElem_Main_mailPanel.style.zIndex = "1500";
            divElem_Main_mailPanel.style.background = "none rgba(0,0,0,0.7)";
            divElem_Main_mailPanel.style.display = "none";
            divElem_Main_mailPanel.innerHTML = "&nbsp;";

            document.body.appendChild(divElem_Main_mailPanel);
        }
        else {
            divElem_Main_mailPanel = document.getElementById("Main_mailPanel");
            divElem_Main_mailPanel.style.width = "100%";
            divElem_Main_mailPanel.style.height = "100%";
            divElem_Main_mailPanel.style.position = "fixed";
            divElem_Main_mailPanel.style.top = "0";
            divElem_Main_mailPanel.style.left = "0";
            divElem_Main_mailPanel.style.zIndex = "1500";
            divElem_Main_mailPanel.style.background = "none rgba(0,0,0,0.7)";
            divElem_Main_mailPanel.style.display = "none";
            divElem_Main_mailPanel.innerHTML = "&nbsp;";
        }

        if (document.getElementsByClassName("loader").length > 0 &&
            document.getElementById("Main_iFrameLayer") != null) {
            rtnValue = true;
        }
        else {
            var divElem = null;
            if (document.getElementsByClassName("layerpopup").length === 0) {
                divElem = document.createElement("DIV");
                divElem.className = "layerpopup";
                divElem.style.zIndex = "2000";
                divElem.style.position = "absolute";
                divElem.style.display = "none";
                divElem.id = "Main_iFramePanel";
            }
            else {
                divElem = document.getElementsByClassName("layerpopup")[0];
            }

            var pElem = null;
            if (document.getElementsByClassName("loader").length === 0) {
                pElem = document.createElement("P");
                pElem.className = "loader";
                pElem.title = "loading";
                divElem.appendChild(pElem);
            }

            var iframeElem = null;
            if (document.getElementById("Main_iFrameLayer") == null) {
                iframeElem = document.createElement("IFRAME");
                iframeElem.src = "/myoffice/blank.htm";
                iframeElem.style.border = "none";
                iframeElem.id = "Main_iFrameLayer";
                divElem.appendChild(iframeElem);
            }

            if (document.getElementsByClassName("layerpopup").length === 0) {

                if (document.getElementById("Main_mailPanel") == null) {
                    var divBlurPanelElem = document.createElement("DIV");
                    divBlurPanelElem.id = "Main_mailPanel";
                    divBlurPanelElem.style.zIndex = "1500";
                    divBlurPanelElem.style.background = "none rgba(0,0,0,0.7)";
                    divBlurPanelElem.style.left = "0px";
                    divBlurPanelElem.style.top = "0px";
                    divBlurPanelElem.style.width = "100%";
                    divBlurPanelElem.style.height = "100%";
                    divBlurPanelElem.style.display = "none";
                    divBlurPanelElem.style.position = "fixed";
                    document.documentElement.appendChild(divBlurPanelElem);
                }

                document.body.appendChild(divElem);
            }

            rtnValue = true;
        }
    }
    catch (e) {
        //console.log("XmlHttpRequest.js checkLoaderLayer() : " + e.message);
    }
    return rtnValue;
    //<div style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 1500; background: none rgba(0,0,0,0.7); display: none;" id="Main_mailPanel">&nbsp;</div>
    //<div class="layerpopup"  style="z-index: 2000; position: absolute;display: none;" id="Main_iFramePanel">
    //        <p class="loader" title="loading"></p>
    //        <iframe src="/myoffice/blank.htm" style="border:none;" id="Main_iFrameLayer"></iframe>
    //    </div>
}

function dragElement(elmnt) {
    var popupTitleElements = null;
    var divMoveListener = null;

    if (typeof elmnt === "object") {
        if (document.getElementById(elmnt.id)) {
            popupTitleElements = document.getElementById(elmnt.id).getElementsByClassName("popupTitle");
            if (popupTitleElements.length > 0) {
                popupTitleElements[0].addEventListener('mousedown', dragMouseDown, true);
                popupTitleElements[0].addEventListener('mouseup', dragMouseUp, true);
            }
        } else {
            popupTitleElements = elmnt.getElementsByClassName("popupTitle");
            if (popupTitleElements.length > 0) {
                popupTitleElements[0].addEventListener('mousedown', dragMouseDown, true);
                popupTitleElements[0].addEventListener('mouseup', dragMouseUp, true);
            }
        }
    }

    function dragMouseUp(e) {
        e = e || window.event;

        if (document.getElementById("popupNoticeLayer")) {
            document.getElementById("popupNoticeLayer").removeEventListener('mouseup', dragMouseUp);
            document.getElementById("popupNoticeLayer").removeEventListener('mousemove', divMoveListener);
            document.getElementById("popupNoticeLayer").removeEventListener('mouseleave', dragMouseUp);
            document.getElementById("popupNoticeLayer").style.display = "none";
            document.getElementById("popupNoticeLayer").setAttribute("_dragLayer", null);

            if (!window.event) {
                window.removeEventListener('mouseup', dragMouseUp);
                window.removeEventListener('mousemove', divMoveListener);
                window.removeEventListener('mouseleave', dragMouseUp);
            }
        }
    }

    function dragMouseDown(e) {
        e = e || window.event;

        if (e.target.classList.contains("popupTitle")) {
            if (!document.getElementById("popupNoticeLayer")) {
                var popupNoticeLayerElement = document.createElement("div");
                popupNoticeLayerElement.style.width = "100%";
                popupNoticeLayerElement.style.height = "100%";
                popupNoticeLayerElement.style.position = "absolute";
                popupNoticeLayerElement.style.top = "0px";
                popupNoticeLayerElement.style.left = "0px";
                popupNoticeLayerElement.style.zIndex = "200000";
                popupNoticeLayerElement.style.background = "none";
                popupNoticeLayerElement.style.display = "none";
                popupNoticeLayerElement.id = "popupNoticeLayer";
                popupNoticeLayerElement.innerHTML = "&nbsp;";
                document.documentElement.appendChild(popupNoticeLayerElement);
            }

            var layerElement = document.getElementsByName("POPUPNOTICE");
            var LayerZindexArray = new Array();
            for (var i = 0; i < layerElement.length; i++) {
                LayerZindexArray.push(parseInt(layerElement[i].style.zIndex));
            }
            LayerZindexArray.sort(function (a, b) { return b - a });
            elmnt.style.zIndex = parseInt(LayerZindexArray[0]) + 1;

            var divElement = e.target.parentElement;
            document.getElementById("popupNoticeLayer").style.zIndex = e.target.parentElement.style.zIndex + 1;
            document.getElementById("popupNoticeLayer").setAttribute("_dragLayer", e.target.parentElement.id);
            document.getElementById("popupNoticeLayer").setAttribute("_x_pos", e.clientX - divElement.offsetLeft);
            document.getElementById("popupNoticeLayer").setAttribute("_y_pos", e.clientY - divElement.offsetTop);
            document.getElementById("popupNoticeLayer").style.display = "";
            document.getElementById("popupNoticeLayer").addEventListener('mouseup', dragMouseUp, true);
            document.getElementById("popupNoticeLayer").addEventListener('mousemove', divMove, false);
            document.getElementById("popupNoticeLayer").addEventListener('mouseleave', dragMouseUp, true);

            if (!window.event) {
                window.addEventListener('mouseup', dragMouseUp, true);
                window.addEventListener('mousemove', divMove, true);
                window.addEventListener('mouseleave', dragMouseUp, true);
            }
        }
    }

    function divMove(e) {
        e = e || window.event;

        var dragLayerID = document.getElementById("popupNoticeLayer").getAttribute("_dragLayer");
        var x_pos = filterInt(document.getElementById("popupNoticeLayer").getAttribute("_x_pos"));
        var y_pos = filterInt(document.getElementById("popupNoticeLayer").getAttribute("_y_pos"));

        var dragLayerElement = document.getElementById(dragLayerID);
        if (dragLayerElement) {
            dragLayerElement.style.position = 'absolute';

            if (0 < (e.clientY - y_pos) && (e.clientY - y_pos) + dragLayerElement.offsetHeight < window.innerHeight - 2) {
                dragLayerElement.style.top = (e.clientY - y_pos) + 'px';
            }

            if (0 < (e.clientX - x_pos) && (e.clientX - x_pos) + dragLayerElement.offsetWidth < window.innerWidth - 1) {
                dragLayerElement.style.left = (e.clientX - x_pos) + 'px';
            }
        }
    }
}

// 메인메뉴의 ...메뉴 클릭시 표시레이어 닫기 이벤트 처리.
// Body에 다른 영역 클릭시 Layer를 닫도록 처리한다.
function _submenu_display(thisobj) {
    if (thisobj.getElementsByClassName("option_horizontal_list").length > 0) {
        if (thisobj.getElementsByClassName("option_horizontal_list")[0].style.display === "none"
            || thisobj.getElementsByClassName("option_horizontal_list")[0].style.display === "") {

            thisobj.getElementsByClassName("option_horizontal_list")[0].style.display = "block";

            document.body.addEventListener("mousedown",
                function onMouseDown_HideMenu(e) {
                    var target = e.target || e.srcElement;
                    var _hideElement = thisobj.getElementsByClassName("option_horizontal_list")[0];
                    if (_hideElement.outerHTML.indexOf(target.outerHTML) > -1) {
                        _hideElement.style.display = "block";
                    }
                    else {
                        _hideElement.style.display = "none";
                        document.body.removeEventListener("mousedown", onMouseDown_HideMenu);
                    }
                }, false);
        }
        else {
            thisobj.getElementsByClassName("option_horizontal_list")[0].style.display = "none";
            document.body.removeEventListener("mousedown", function onMouseDown_HideMenu(e) {
                var target = e.target || e.srcElement;
                var _hideElement = thisobj.getElementsByClassName("option_horizontal_list")[0];
                if (_hideElement.outerHTML.indexOf(target.outerHTML) > -1) {
                    _hideElement.style.display = "block";
                }
                else {
                    _hideElement.style.display = "none";
                    document.body.removeEventListener("mousedown", onMouseDown_HideMenu);
                }
            });
        }
    }
}

function searchFilter() {
    if (document.getElementsByClassName("contentlist_search_filter").length > 0) {
        for (i = 0; i < document.getElementsByClassName("contentlist_search_filter").length; i++) {
            if (document.getElementsByClassName("contentlist_search_filter")[i].style.display != "none") {
                document.getElementsByClassName("contentlist_search_filter")[i].style.display = "none";
            }
            else {
                document.getElementsByClassName("contentlist_search_filter")[i].style.display = "block";
            }
        }
        try {
            if (typeof enableQuickSearch == "function") {
                enableQuickSearch(isSearchFilterON);
            }
        }
        catch (e) { console.log(e.toString()); }
    }
    PreviewOnResize();
}

////프리젠스 임시 함수
//function PresenceControl(uri){

//}

function MakePageNavi(TotalPage, CurrentPage, PageBlockSize, TargetID, ReturnFunction) {
    if (TotalPage == "0") TotalPage = "1";

    var PageElement = document.createElement("div");
    var PageHTML = "";
    var MaxNum;
    var i;
    var startNum = (parseInt((CurrentPage - 1) / PageBlockSize) * PageBlockSize) + 1;
    if (TotalPage >= (startNum + parseInt(PageBlockSize))) {
        MaxNum = (startNum + parseInt(PageBlockSize)) - 1;
    }
    else {
        MaxNum = TotalPage;
    }

    var SPAN_GOTOPAGE1 = document.createElement("span");
    SPAN_GOTOPAGE1.className = "btnimg";
    SPAN_GOTOPAGE1.setAttribute("onClick", "GoToPageNavi(" + TotalPage + ", 1," + ReturnFunction + ");");
    var SPAN_AAROW_LEFT_OVER = document.createElement("span");
    SPAN_AAROW_LEFT_OVER.id = "span_doubleArrow_left";

    if (TotalPage > 1 && CurrentPage != 1)
        SPAN_AAROW_LEFT_OVER.className = "icon16 pagenavi_aarow_left_over";
    else
        SPAN_AAROW_LEFT_OVER.className = "icon16 pagenavi_aarow_left";

    SPAN_GOTOPAGE1.appendChild(SPAN_AAROW_LEFT_OVER);
    PageElement.appendChild(SPAN_GOTOPAGE1);

    var SPAN_BEFOREBLOCK = document.createElement("span");
    SPAN_BEFOREBLOCK.className = "btnimg";
    SPAN_BEFOREBLOCK.setAttribute("onClick", "BeforeBlock(" + TotalPage + ", " + CurrentPage + ", " + PageBlockSize + ", " + ReturnFunction + ");");
    var SPAN_AROW_LEFT = document.createElement("span");
    SPAN_AROW_LEFT.id = "span_Arrow_left";

    if (parseInt(CurrentPage) > 1) { //20180713 ahh 페이지네이션 수정
        SPAN_AROW_LEFT.className = "icon16 pagenavi_arow_left_over";
    }
    else {
        SPAN_AROW_LEFT.className = "icon16 pagenavi_arow_left";
    }
    
    SPAN_BEFOREBLOCK.appendChild(SPAN_AROW_LEFT);
    PageElement.appendChild(SPAN_BEFOREBLOCK);

    for (i = startNum; i <= MaxNum; i++) {
        var SPAN_PAGENUM = document.createElement("span");
        if (i == CurrentPage) {
            SPAN_PAGENUM.className = "on";
            SPAN_PAGENUM.style = "margin-left:1px; margin-right:1px;";
            SPAN_PAGENUM.setAttribute("onClick", "GoToPageNavi(" + TotalPage + ", " + i + ", " + ReturnFunction + ");");
            SPAN_PAGENUM.innerText = i;
            PageElement.appendChild(SPAN_PAGENUM);
        }
        else {
            SPAN_PAGENUM.style = "margin-left:1px; margin-right:1px;";
            SPAN_PAGENUM.setAttribute("onClick", "GoToPageNavi(" + TotalPage + ", " + i + ", " + ReturnFunction + ");");
            SPAN_PAGENUM.innerText = i;
            PageElement.appendChild(SPAN_PAGENUM);
        }
    }

    var SPAN_AFTERBLOCK = document.createElement("span");
    SPAN_AFTERBLOCK.className = "btnimg";
    SPAN_AFTERBLOCK.setAttribute("onClick", "AfterBlock(" + TotalPage + ", " + CurrentPage + ", " + PageBlockSize + ", " + ReturnFunction + ");");
    var SPAN_AROW_RIGHT = document.createElement("span");
    SPAN_AROW_RIGHT.id = "span_Arrow_right";

    if (TotalPage > parseInt(CurrentPage)) { //20180713 ahh 페이지네이션 수정
        SPAN_AROW_RIGHT.className = "icon16 pagenavi_arow_right_over";
    }
    else {
        SPAN_AROW_RIGHT.className = "icon16 pagenavi_arow_right";
    }    

    SPAN_AFTERBLOCK.appendChild(SPAN_AROW_RIGHT);
    PageElement.appendChild(SPAN_AFTERBLOCK);

    var SPAN_GOTOPAGEFINAL = document.createElement("span");
    SPAN_GOTOPAGEFINAL.className = "btnimg";
    SPAN_GOTOPAGEFINAL.setAttribute("onClick", "GoToPageNavi(" + TotalPage + ", " + TotalPage + ", " + ReturnFunction + ");");
    var SPAN_AAROW_RIGHT = document.createElement("span");
    SPAN_AAROW_RIGHT.id = "span_doubleArrow_right";

    if (TotalPage > 1 && TotalPage != 1 && (TotalPage != CurrentPage))
        SPAN_AAROW_RIGHT.className = "icon16 pagenavi_aarow_right_over";
    else
        SPAN_AAROW_RIGHT.className = "icon16 pagenavi_aarow_right";

    SPAN_GOTOPAGEFINAL.appendChild(SPAN_AAROW_RIGHT);
    PageElement.appendChild(SPAN_GOTOPAGEFINAL);

    document.getElementById(TargetID).innerHTML = PageElement.innerHTML;
}

function GoToPageNavi(TotalPage, CurrentPage, ReturnFunction) {
    CurPage = CurrentPage;
    ReturnFunction(CurrentPage, TotalPage);
}

function BeforeBlock(TotalPage, CurrentPage, PageBlockSize, ReturnFunction) {
    var pageNum = parseInt(CurrentPage) - 1; //20180713 ahh 페이지네이션 수정   
    if (pageNum > 0)
        GoToPageNavi(TotalPage, pageNum, ReturnFunction);
}

function AfterBlock(TotalPage, CurrentPage, PageBlockSize, ReturnFunction) {
    var pageNum = parseInt(CurrentPage) + 1; //20180713 ahh 페이지네이션 수정   
    if (pageNum <= TotalPage)
        GoToPageNavi(TotalPage, pageNum, ReturnFunction);
}

// 단위 프로그램으로 바로가기 이동
// 메인화면 등 멀티뷰로 호출된 화면에서 메일 등으로 바로가기 위해 사용
// 
// index (integer)
//      10: 메일 (10: 받은편지함, 11: 보낸편지함...)
//      20: 결재 (20: 결재할문서, 21: 결재진행문서...)
//      30: 결재G (30: 결재할문서, 31: 결재진행문서...)
//      40: 게시판 (40: 게시판, 41: 전자설문...)
//      50: 일정 (50: 일정, 51: 업무관리)
//      60: 자원관리
//      70: 주소록
//      80: 협업
// appTitle: 멀티뷰 헤더 Title (상단메뉴 영역에 정의된 메뉴인 경우 빈값)
// bMultiview: false(기본값): 싱글뷰로 이동, true: 화면이 멀티뷰로 전환
// 
// 사용법1 예시: GoToApplication(10);                 // 상단메뉴에 정의된 메일(받은편지함)
// 사용법2 예시: GoToApplication(19, "지운편지함");   // 상단메뉴에 정의되지 않은 경우 제목 입력
// 사용법2 예시: GoToApplication(11, "", true);       // 상단메뉴에 정의된 메일(받은편지함)을 멀티뷰로 오픈
function GoToApplication(index, appTitle, bMultiview, param)
{   
    //20180913 데모서버 전자결재G 포틀릿이면 메인포틀릿 이동을 G버전 페이지로 이동하도록 추가
    if (Use_ApprovalG) {
        if (index.substr(0, 1) == "2")
            index = "3" + index.substr(1);
    }
    if (index == "12") {  // O365 OWA
        window.open("/ezo365sso/signon.aspx?rp=owa");
        return;
    }
    var URL = "";
    switch (index) {
        case "10":  // 받은편지함
            URL = "/myoffice/ezEmail/index_myoffice.aspx?funcode=1";
            break;
        case "11":  // 보낸편지함
            URL = "/myoffice/ezEmail/index_myoffice.aspx?funcode=1&subfunction=2";
            break;

        case "20":  // 결재할문서 - 대시보드 사용시 대시보드페이지로 이동 (일반버전)
            URL = "/myoffice/ezApproval/index_approval.aspx?";
            break;
        case "21":  // 결재할문서 (일반버전)
            URL = "/myoffice/ezApproval/index_approval.aspx?listType=1";
            break;
        case "23":  // 결재진행중인 문서 (일반버전)
            URL = "/myoffice/ezApproval/index_approval.aspx?listType=3";
            break;
        case "24":  // 부서수신문서 (일반버전)
            URL = "/myoffice/ezApproval/index_approval.aspx?listType=4";
            break;
        case "211":  // 반려문서 (일반버전)
            URL = "/myoffice/ezApproval/index_approval.aspx?listType=11";
            break;

        case "30":  // 결재할문서 (G버전)
            URL = "/myoffice/ezApprovalG/index_approval.aspx";
            break;
        case "31":  // 결재진행문서 (G버전)
            URL = "/myoffice/ezApprovalG/index_approval.aspx?listType=1";
            break;
        case "33":  // 결재진행중인 문서 (G버전)
            URL = "/myoffice/ezApprovalG/index_approval.aspx?listType=3";
            break;
        case "34":  // 부서수신문서 (G버전)
            URL = "/myoffice/ezApprovalG/index_approval.aspx?listType=4";
            break;

        case "40":  // 게시판
            if (typeof (param) != 'undefined')
                URL = "/myoffice/ezBoardSTD/index_Board.aspx?boardid=" + param;
            else
                URL = "/myoffice/ezBoardSTD/index_Board.aspx";
            break;
        case "41":  // 전자설문
            URL = "/myoffice/ezquestion/index_question.aspx";
            break;
        case "42":  // 단위조직 
            //URL = "/myoffice/ezBoardSTD/corevalue/index_board.aspx?boardid=" + param;
            URL = "/myoffice/ezBoardSTD/corevalue/index_board.aspx?" + param;
            break;
        case "43":  // 내부정보공유 
            URL = "/myoffice/ezBoardSTD/index_Board.aspx?Func=99&boardid=" + param;
            break;

        case "50":  // 일정
            URL = "/myoffice/ezSchedule/index_Schedule.aspx";
            break;
        case "51":  // 업무관리
            URL = "/myoffice/ezSchedule/index_Schedule.aspx";
            break;

        case "60":  // 자원관리
            URL = "/myoffice/ezResource/index_resource.aspx";
            break;

        case "70":  // 주소록
            URL = "";
            break;

        case "80":  // 협업
            URL = "/myoffice/ezWorkspace/Account/SSO";
            break;

        case "90":  // 환경설정
            URL = "/myoffice/ezpersonal/index_environment.aspx";
            break;

        case "91":  // 환경설정 포탈 화면 설정
            URL = "/myoffice/ezpersonal/index_environment.aspx?menuType=1";
            break;

        case "92":  // 환경설정 퀵링크 화면 설정
            URL = "/myoffice/ezpersonal/index_environment.aspx?menuType=2";
            break;

        case "97":  // 환경설정 알림 환경 설정
            URL = "/myoffice/ezpersonal/index_environment.aspx?menuType=7";
            break;
    }

    GoToApplicationUrl(URL, appTitle, bMultiview);
}

// url로 바로가기
// 메인화면 등 멀티뷰로 호출된 화면에서 메일 등으로 바로가기 위해 사용
// 
// url: 이동할 url
// appTitle: 멀티뷰 헤더 Title (상단메뉴 영역에 정의된 메뉴인 경우 빈값)
// bMultiview: false(기본값): 싱글뷰로 이동, true: 화면이 멀티뷰로 전환
// 
// 사용법1 예시: GoToApplication(url, "멀티뷰 Title");          // 특정 Url로 이동
// 사용법2 예시: GoToApplication(url, "멀티뷰 Title", true);    // 특정 Url을 멀티뷰로 오픈
function GoToApplicationUrl(url, appTitle, bMultiview)
{
    if (url) {
        // 멀티뷰 헤더 Title
        var title = "";
        if (typeof (appTitle) != "undefined")
            title = appTitle;

        // 멀티뷰 오픈 여부
        var bMulti = false;
        if (typeof (bMultiview) != "undefined" && (bMultiview === false || bMultiview === true))
            bMulti = bMultiview;

        // 멀티뷰 환경 여부 체크
        var targetwindow = null;
        if (window.parent && window.parent._WindowTop)    // div 웹파트
        {
            targetwindow = window.parent;
        }

        if (window.parent && window.parent.parent && window.parent.parent._WindowTop)    // iframe 웹파트
        {
            targetwindow = window.parent.parent;
        }

        if (targetwindow && targetwindow.OpenWindowFromChild) {
            // /myoffice/common/multiview/scripts/LayoutMain.js에 정의
            targetwindow.OpenWindowFromChild(url, title, bMulti);
        }
    }
}

// 상위 엘리먼트 찾기(Selector)
function getParent_selector(thisObj, selector) {
    var elements = [];
    var elem = thisObj;
    var ishaveselector = selector !== undefined;

    while ((elem = (elem.parentElement != null ? elem.parentElement:null)) !== null) {
        if (elem.nodeType !== Node.ELEMENT_NODE) {
            continue;
        }

        if (!ishaveselector || (!Element.prototype.matches ? elem.msMatchesSelector(selector) : elem.matches(selector))) {
            elements.push(elem);
        }
    }

    return elements;
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // Firefox를 제외한 모든 브라우저
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // 코드가 존재하지 않을 수도 있기 때문에 테스트 이름 필드도 있습니다.
            // Firefox를 제외한 모든 브라우저
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
            storage.length !== 0;
    }
}

// int 변환 함수(더 엄격한 파싱)
filterInt = function (value) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return Number(value);
    return NaN;
};

function DivPopUpShow_FullScreen(thisobj) {
    if (window.parent != null && window.parent.document.getElementById("Main_iFramePanel") != null) {
        if (thisobj.getElementsByTagName("span").length > 0) {
            if (!thisobj.getElementsByTagName("span")[0].classList.contains("fullscreen01")) {
                // 최소화로
                window.parent.document.getElementById("Main_iFramePanel").style.marginTop = window.parent.document.getElementById("Main_iFramePanel").getAttribute("_margintop");
                window.parent.document.getElementById("Main_iFramePanel").style.marginLeft = window.parent.document.getElementById("Main_iFramePanel").getAttribute("_marginleft");
                window.parent.document.getElementById("Main_iFramePanel").style.left = "50%";
                window.parent.document.getElementById("Main_iFramePanel").style.top = "50%";
                window.parent.document.getElementById("Main_iFramePanel").style.width = window.parent.document.getElementById("Main_iFramePanel").getAttribute("_width");
                window.parent.document.getElementById("Main_iFramePanel").style.height = window.parent.document.getElementById("Main_iFramePanel").getAttribute("_height");

                if (window.parent.document.documentElement.clientWidth < window.parent.document.getElementById("Main_iFramePanel").clientWidth + 30) {
                    window.parent.document.getElementById("Main_iFramePanel").style.marginLeft = 0;
                    window.parent.document.getElementById("Main_iFramePanel").style.left = "15px";
                }

                if (window.parent.document.documentElement.clientHeight < window.parent.document.getElementById("Main_iFramePanel").clientHeight + 30) {
                    window.parent.document.getElementById("Main_iFramePanel").style.marginTop = 0;
                    window.parent.document.getElementById("Main_iFramePanel").style.top = "15px";
                }

                thisobj.getElementsByTagName("span")[0].classList.remove("smallscreen01");
                thisobj.getElementsByTagName("span")[0].classList.add("fullscreen01");

                // 사이즈가 변경될 때 같이 수정되어야 할 내용들이 있기에 추가함 함수 내용은 필요한 페이지에서 작성
                try {
                    call_sizeChangeEvent("min");
                }
                catch (e) { }
            }
            else {
                // 최대화로
                window.parent.document.getElementById("Main_iFramePanel").style.marginTop = null;
                window.parent.document.getElementById("Main_iFramePanel").style.marginLeft = null;
                window.parent.document.getElementById("Main_iFramePanel").style.left = "15px";
                window.parent.document.getElementById("Main_iFramePanel").style.top = (window.parent.document.documentElement.scrollTop + 15).toString() + "px";
                window.parent.document.getElementById("Main_iFramePanel").style.width = "calc(100% - 30px)";
                window.parent.document.getElementById("Main_iFramePanel").style.height = "calc(100% - 30px)";
                window.parent.document.getElementById("Main_iFramePanel").style.minWidth = window.parent.document.getElementById("Main_iFramePanel").getAttribute("_width");
                window.parent.document.getElementById("Main_iFramePanel").style.minHeight = window.parent.document.getElementById("Main_iFramePanel").getAttribute("_height");

                thisobj.getElementsByTagName("span")[0].classList.remove("fullscreen01");
                thisobj.getElementsByTagName("span")[0].classList.add("smallscreen01");

				// 사이즈가 변경될 때 같이 수정되어야 할 내용들이 있기에 추가함 함수 내용은 필요한 페이지에서 작성
                try {
                    call_sizeChangeEvent("max");
                }
                catch (e) { }
            }

            try{
                LayerPopupLayoutSize();
            } catch (e) { }
        }
    }
}

window.addEventListener("keyup", function (e) {
    var keycode = (e.keyCode || e.which);
    // 레이어 팝업이 동작하고 있을 경우 탭키를 사용하여 부모창에 포커스가 안가도록 처리
    if (document.getElementById("Main_iFramePanel") != null) {
        if (document.getElementById("Main_iFramePanel").style.display == "") {
            switch (keycode) {
                case 9:
                    // 탭키로 이동
                    if (getParent_selector(document.activeElement, "#Main_iFramePanel").length === 0) {
                        document.activeElement.blur();
                        document.getElementById("Main_iFrameLayer").contentWindow.focus();
                    }
                    break;
            }
        }
    }

    // 일정시간 사용없을 경우 비밀번호 확인창 표시 기능.
    if (document.getElementById("Main_iFrameUserLockPanel") != null) {
        if (document.getElementById("Main_iFrameUserLockPanel").style.display == "") {
            switch (keycode) {
                case 9:
                    // 탭키로 이동
                    if (getParent_selector(document.activeElement, "#Main_iFrameUserLockPanel").length === 0) {
                        document.activeElement.blur();
                        document.getElementById("Main_iFrameUserLockLayer").contentWindow.focus();
                    }
                    break;
            }
        }
    }
});


/*
// [2018-02-22] 자동완성
[param] - 2자 이상일 경우 처리
    argFlagControlName : Selectbox id
        U (displayname) : 이름
        D (description) : 부서
        T (title) : 직위
    argTargetName : 자동완성을 적용할 대상 TextBox id
*/
function fnSetAutocomplete(argFlagControlName, argTargetName) {
    if (0 == argFlagControlName.indexOf('#')) {
        argFlagControlName = argFlagControlName.substr(1);
    }

    if (0 == argTargetName.indexOf('#')) {
        argTargetName = argTargetName.substr(1);
    }

    argFlagControlName = '#' + argFlagControlName;
    argTargetName = '#' + argTargetName;

    var autocompleteTargetObj = jQuery(argTargetName);
    var selectTmpValue = '';

    autocompleteTargetObj.autocomplete({
        source: function (request, response) {
            jQuery.ajax({
                type: 'post'
                , url: '/myoffice/ezPersonal/PersonSearch/AutoCompleteList.aspx'
                , dataType: "json"
                , data: { value: request.term, pflag: jQuery(argFlagControlName).val() }
                , success: function (data) {
                    response(
                        jQuery.map(data, function (item) {
                            return {
                                label: item.data
                                , value: item.data
                            }
                        })
                    );
                }
            });
        }
        , minLength: 2
        , select: function (event, ui) {
            jQuery(this).focus();
        }
        , focus: function (event, ui) {
            return false;
        }
    });

    var chkTmpEvent = 'onkeypress';
    var tmpEvent = autocompleteTargetObj.attr(chkTmpEvent);

    autocompleteTargetObj.attr(chkTmpEvent, tmpEvent + '; jQuery("' + argTargetName + '").autocomplete("close");');
}

/*
// [2018-02-27] 게시판 통합 알림 발송
[알림 없음]
    - 게시글 수정 (승인 알림은 발송)
    - 게시글 삭제
    - 게시글 답변 삭제
    - 게시글 한줄답변(덧글) 삭제
[param]
    argFlag         : 구분값 (Page|Mode|...)
        - NewBoardItem|new                      게시글 등록 - 승인게시판
            NewBoardItem|APPR|new|              승인 게시판인 경우에 추가 알림 (일반 게시판은 없음)

        - NewBoardItem|APPR|modify|Y            게시글 답변 수정 (승인 게시판)              isReplyItem : true
        - NewBoardItem|APPR|modify|Y            게시글 승인 후 수정 - 승인 게시판            isReplyItem : false
        - NewBoardItem|APPR|modify|C            게시글 반려 후 수정(저장) - 승인게시판
        
        - NewBoardItem|reply                    게시글 답변 (게시글 답변의 답변,... 동일) 등록          답변의 답변,... isReplyItem : true
            NewBoardItem|APPR|reply|Y           승인 게시판인 경우에 추가 알림 (일반 게시판은 없음)      답변의 답변,... isReplyItem : true

        - BoardItemView|OneLineReply|NEW        게시글 한줄답변(덧글)
            BoardItemView|OneLineReply|EDIT     한줄답변(덧글) 수정
            BoardItemView|OneLineReply|PLUS     한줄답변(덧글)의 한줄답변(덧글),...
        - BoardItemView|APPR_XMLY               게시글 승인
        
        - BoardItemList_Appr|APPR_XMLY          게시글 승인

        - BoardApprOpinion|C                    게시글 반려 

    argBoardId      : 게시판 아이디 (필수)
    argItemId       : 게시글 아이디 (필수)
    argItemTreeId   : 상위 게시글 아이디 정보
    argExt          : 확장 파라미터 (필요 시 처리)
*/
function fnSendBoardNoti(argFlag, argBoardId, argItemId, argItemTreeId, argExt) {
    // 포토게시판 및 썸네일 게시판 알림 제외
    //if (-1 < argFlag.indexOf('BoardItemView_Photo')
    //    || -1 < argFlag.indexOf('NewBoardItem_Photo')
    //    || -1 < argFlag.indexOf('NewBoardItem_TempPhoto')
    //) {
    //    return 'OK';
    //}

    // 게시글 답변 및 답변의 답변,... 체크 변수
    var isReplyItem = false;

    if (38 < argItemTreeId.length) {
        isReplyItem = true;
    }

    // 발송 대상 Flag check
    if (false == fnCheckIsSendNotification(argFlag)) {
        return 'OK';
    }

    var xmlhttpSendBoardNotice = null;

    try {
        var notifyUrlStr = '/myoffice/ezBoardSTD/interASP/SendBoardNotice.aspx';

        if ('Y' == fnGetBoardAppCommonCode('BOARD_MAIL_NOTIFICATION')) {
            notifyUrlStr = '/myoffice/ezBoardSTD/interASP/SendBoardNoticeMail.aspx';
        }

        var sendBoardNoticeUrl = notifyUrlStr + '?BoardID=' + argBoardId + '&ItemID=' + argItemId;
        var isBoardOneComment = false;

        if ('' != argItemTreeId) {      // 답글
            sendBoardNoticeUrl = sendBoardNoticeUrl + '&ItemTreeID=' + argItemTreeId;
        }

        if (-1 < argExt.indexOf('||comment||')) {      // 한줄답변
            sendBoardNoticeUrl = sendBoardNoticeUrl + '&comment=y' + '&replyid=' + argExt.replace('||comment||', '');

            isBoardOneComment = true;
        }

        sendBoardNoticeUrl = sendBoardNoticeUrl + '&aflg=' + argFlag + '|' + isReplyItem.toString();

        if ('NewBoardItem|newY' == argFlag || 'NewBoardItem|saveY' == argFlag) {
            sendBoardNoticeUrl = sendBoardNoticeUrl + '&isshareflag=y';
        }

        if ('NewBoardItem|new' == argFlag || 'NewBoardItem_Photo|new' == argFlag || 'NewBoardItem_qna|new' == argFlag) {
            sendBoardNoticeUrl = sendBoardNoticeUrl + '&isnewflag=y';
        }

        if ('NewBoardItem_qna|new' == argFlag) {
            sendBoardNoticeUrl = sendBoardNoticeUrl + '&isqna=y&iscateid=' + argExt;
        }

        xmlhttpSendBoardNotice = createXMLHttpRequest();
        xmlhttpSendBoardNotice.open('POST', sendBoardNoticeUrl, false);

        if (false == isBoardOneComment && -1 < argExt.indexOf('<NODE>')) {
            xmlhttpSendBoardNotice.send(loadXMLString(argExt));
        }
        else {
            xmlhttpSendBoardNotice.send();
        }

        return xmlhttpSendBoardNotice.responseText;
    }
    catch (e) {
        return 'ERROR : ' + e.message;
    }
    finally {
        xmlhttpSendBoardNotice = null;
    }
}

function fnCheckIsSendNotification(argChkRecFlag) {
    var sendCheckNotification = false;

    var arrSendFlag = [
        'NewBoardItem|APPR|new|'                // 승인자 - [승인 게시판] 게시글 작성 시
        , 'NewBoardItem|APPR|modify|C'          // 승인자 - [승인 게시판] 반려 후 수정(저장) 시
        , 'BoardItemList_Appr|APPR_XMLY'        // 게시글 작성자 - [승인 게시판] 승인
        , 'BoardItemView|APPR_XMLY'             // 게시글 작성자 - [게시글 상세보기] 승인
        , 'BoardApprOpinion|C'                  // 게시글 작성자 - [승인 게시판 / 게시글 상세보기] 반려 시
        , 'NewBoardItem|reply'                  // 해당 게시글 작성자 - 답변,... 시
        , 'NewBoardItem|APPR|reply|Y'           // 승인자 - [승인 게시판] 답변,... 시
        , 'BoardItemView|OneLineReply|NEW'      // 해당 게시글 작성자 - 한줄 답변(덧글) 시
        , 'BoardItemView|OneLineReply|PLUS'     // 해당 덧글 작성자 - 한줄 답변(덧글)의 한줄 답변(덧글),... 시
        , 'NewBoardItem|new'                    // 신규 등록 일반
        , 'NewBoardItem_Photo|new'                    // 신규 등록 일반 (포토)
        , 'NewBoardItem_qna|new'                    // 신규 등록 일반 (승인 담당자)
        , 'NewBoardItem|newY'                   // 신규 등록 (내부정보공유)
        , 'NewBoardItem|saveY'                  // 임시저장 후 신규 등록 (내부정보공유)
    ];

    var nSendFlagCnt = arrSendFlag.length;

    for (var i = 0; i < nSendFlagCnt; i++) {
        if (arrSendFlag[i] == argChkRecFlag) {
            sendCheckNotification = true;

            break;
        }
    }

    return sendCheckNotification;
}

function fnGetBoardAppCommonCode(argKey) {
    var retApplicationValue = '';

    try {
        var paramXml = '<DATA>';
        paramXml += '<ROW>';
        paramXml += '<SEQ></SEQ>';
        paramXml += '<KEY>' + argKey + '</KEY>';
        paramXml += '<VALUE></VALUE>';
        paramXml += '<COMMENT></COMMENT>';
        paramXml += '<ROW>';
        paramXml += '</DATA > ';

        var xmlhttpBoardAppCodeList = createXMLHttpRequest();
        xmlhttpBoardAppCodeList.open("POST", "/myoffice/ezBoardSTD/admin/interASP/BoardApplciationCodeDac.aspx?aFlag=L", false);
        xmlhttpBoardAppCodeList.send(loadXMLString(paramXml));

        var xmlhttpBoardAppCodeListDom = loadXMLString(xmlhttpBoardAppCodeList.responseText);

        retApplicationValue = getNodeText(xmlhttpBoardAppCodeListDom.getElementsByTagName('CODEVALUE')[0]);
    }
    catch (e) {
        console.log(e.message);
    }

    return retApplicationValue;
}

// [2018-03-02] 게시글 공개/편집 권한 기능 s ---------------------------------------------------------
// code expand if multi popup organizaion per page!!!
/*
[param]
    argListObjName         : 조직도 리스트 출력 창
*/
var selectTargetListObjName = '';
var selectTargetListXML = '';
//var selecttarget_dialogArguments = new Array();
var ADD_Group_dialogArguments = new Array();
var isSourceXmlPopup = true;

function fnSelectAccessTargetList(argListObjName, argCompanyId) {
    isSourceXmlPopup = true;
    selectTargetListObjName = argListObjName;

    var tmpReceiverData = {
        type: 'multi',                          // single : 단일 데이터 , multi : 멀티 데이터 Return , search : 직원 상세보기 View
        addtype: 'all',                         // all : 부서, 사용자, 전체 추가, dept : 부서 추가, user : 사용자 추가
        pagename: 'Board_Authority',            // 페이지명 사이즈 조절용
        requestfield: 'cn;type;displayname;listflag'     // Return 데이터 필드
    };

    ADD_Group_dialogArguments[0] = tmpReceiverData;
    ADD_Group_dialogArguments[1] = fnSelectAccessTargetListCallback;

    DivPopUpShow(1000, 720, '/myoffice/ezOrgan/AuthorityGroup/Authority_MultiSelect.aspx?companyid=' + argCompanyId);

    return false;
}

function fnSelectAccessTargetListCallback(argRet) {
    if (isSourceXmlPopup) {
        DivPopUpHidden();
    }

    var tmpChkReturnType = typeof argRet;

    if ('undefined' != tmpChkReturnType) {
        var boardSetId = 'BoardAccessListView';

        if ('string' == tmpChkReturnType) {
            selectTargetListXML = argRet;
        }
        else if ('object' == tmpChkReturnType) {
            selectTargetListXML = fnBoardAuthorityOragnObjToXmlStr(argRet);
        }

        if ('' == selectTargetListXML) {
            return false;
        }

        var selectTargetListObj = document.getElementById(selectTargetListObjName);
        selectTargetListObj.innerHTML = '';

        var listview = new ListView();
        listview.SetID(boardSetId);
        listview.SetMulSelectable(false);
        listview.DataSource(loadXMLString(document.getElementById("listviewheader").innerHTML.toUpperCase()));
        listview.DataBind(selectTargetListObjName);

        document.getElementById(boardSetId + '_TR_noItems').style.display = 'none';

        var xmldom = loadXMLString(selectTargetListXML);
        var tmpCnt = xmldom.getElementsByTagName('CN').length;

        var listTR = null;
        var nodeTargetText = '';
        var nodeTargetId = '';
        var tmpDeleteButtonTag = '';

        var isItemReadRight = selectTargetListObj.getAttribute('data-isread');
        var isItemEditRight = selectTargetListObj.getAttribute('data-isedit');

        for (i = 0; i < tmpCnt; i++) {
            listTR = listview.AddRow(listview.GetRowCount());
            listTR.setAttribute('name', 'dataRow');
            listTR.style.cursor = 'default';

            // DEPT: PERSON / DEPT
            // GROUP : N
            nodeTargetText = getNodeText(xmldom.getElementsByTagName('NAME')[i]);

            nodeTargetId = getNodeText(xmldom.getElementsByTagName('CN')[i])
                + '|' + getNodeText(xmldom.getElementsByTagName('DEPT')[i])
                + '|' + getNodeText(xmldom.getElementsByTagName('GROUP')[i]);

            fnMakeAppendObj('TD', 'target', nodeTargetText, nodeTargetId, listTR);

            if ('Y' == isItemReadRight) {
                fnMakeAppendObj('TD', 'right', '<input type="checkbox" id="chkBoardRightRead_' + i.toString() + '" ' + SetCheckboxCheckedTag(getNodeText(xmldom.getElementsByTagName('ISREAD')[i])) + ' />', '', listTR);
            }

            if ('Y' == isItemEditRight) {
                fnMakeAppendObj('TD', 'right', '<input type="checkbox" id="chkBoardRightEdit_' + i.toString() + '" ' + SetCheckboxCheckedTag(getNodeText(xmldom.getElementsByTagName('ISEDIT')[i])) + ' />', '', listTR);
            }

            tmpDeleteButtonTag = '<li class="rightbtn" onclick="return fnRightRowDelete(this);" style=""><span class="icon16 backhistory"></span></li>';
            fnMakeAppendObj('TD', 'right', tmpDeleteButtonTag, '', listTR);
        }
    }

    return false;
}

function fnBoardAuthorityOragnObjToXmlStr(argRetObj) {
    var retXmlString = '';

    var nRetCnt = argRetObj.length;

    if (0 < nRetCnt) {
        retXmlString = '<DATA>';

        for (var i = 0; i < nRetCnt; i++) {
            /*  lsitflag :    
            *   U       직원
            *   D       부서
            *   // todo: 권한그룹 완료 확인 후 작업
            *   W       사업장
            *   L       직급
            *   P       직책
            *   T       직위
            *   argRetObj : t += argRetObj[i].cn + '^' + argRetObj[i].type + '^' + argRetObj[i].displayname + '^' + argRetObj[i].listflag;
            * */
            retXmlString += '<CN>' + argRetObj[i].cn + '</CN>';
            retXmlString += '<NAME>' + argRetObj[i].displayname + '</NAME>';
            retXmlString += '<DEPT>' + argRetObj[i].listflag + '</DEPT>';
            retXmlString += '<GROUP>' + argRetObj[i].type + '</GROUP>';
        }

        retXmlString += '</DATA>';
    }

    return retXmlString;
}

function SetCheckboxCheckedTag(argValue) {
    var checkboxCheckAttribute = '';

    if ('Y' == argValue) {
        checkboxCheckAttribute = 'checked="checked"';
    }

    return checkboxCheckAttribute;
}

function fnRightRowDelete(argObj) {
    var removeCheckTr = jQuery(argObj).closest('tr');
    var deleteChkCn = removeCheckTr.find('td').eq(0).attr('nodedata').split('|')[0];

    var tmpXmlObj = loadXMLString(selectTargetListXML);
    var tmpDeleteChkRow = tmpXmlObj.getElementsByTagName('CN').length;

    var removeXmlNodes = [
        'CN'
        , 'NAME'
        , 'NAME2'
        , 'ISREAD'
        , 'ISEDIT'
        , 'DEPT'
        , 'GROUP'
    ];

    var nRemoveXmlNodeCnt = removeXmlNodes.length;
    var chkRemoveChildNode = null;

    for (var i = 0; i < tmpDeleteChkRow; i++) {
        if (deleteChkCn == getNodeText(tmpXmlObj.getElementsByTagName('CN')[i])) {
            for (var z = 0; z < nRemoveXmlNodeCnt; z++) {
                chkRemoveChildNode = tmpXmlObj.getElementsByTagName(removeXmlNodes[z])[i];

                if (null != chkRemoveChildNode) {
                    try {
                        chkRemoveChildNode.remove();
                    }
                    catch (e) {
                        chkRemoveChildNode.parentNode.removeChild(chkRemoveChildNode);
                    }
                }
            }
        }
    }

    selectTargetListXML = getXmlString(tmpXmlObj);

    removeCheckTr.remove();

    return false;
}

function fnMakeAppendObj(argElemName, argFlag, argText, argId, argInsertSource) {
    var appendElemObj = document.createElement(argElemName);

    if ('right' == argFlag) {
        appendElemObj.style.paddingLeft = '12px';

        appendElemObj.innerHTML = argText;
    }
    else {
        appendElemObj.style.paddingBottom = '0px';
        appendElemObj.style.paddingTop = '0px';

        appendElemObj.setAttribute('nodedata', argId);
        appendElemObj.innerText = argText;
    }

    argInsertSource.appendChild(appendElemObj);
}

/* cn^read^write;cn1^read^write;...
 * */
function fnGetRightSelectList() {
    var chkTrItem = null;
    var retRightSelectList = new Array();

    jQuery('#' + selectTargetListObjName).find('[name=dataRow]').each(function (idx, trItem) {
        chkTrItem = jQuery(trItem).find('td');

        retRightSelectList.push(
            //chkTrItem[0].getAttribute('nodedata')
            //+ '^' + chkTrItem[1].querySelector('[type=checkbox]').checked   // read
            //+ '^' + chkTrItem[2].querySelector('[type=checkbox]').checked   // edit

            chkTrItem[0].getAttribute('nodedata') + '^true^false'
        );
    });

    return retRightSelectList.join(';');
}

var xmlRightHttpObj = null;

function fnGetRightUserList(argItemId, argListObjName) {
    selectTargetListObjName = argListObjName;

    var xmlRightParam = createXmlDom();
    var objRightXmlNode;
    createNodeInsert(xmlRightParam, objRightXmlNode, 'PARAMETER');
    createNodeAndInsertText(xmlRightParam, objRightXmlNode, 'pItemID', argItemId);

    xmlRightHttpObj = null;
    xmlRightHttpObj = createXMLHttpRequest();
    xmlRightHttpObj.open('POST', '/myoffice/ezBoardSTD/aspx/Get_ApprUserList.aspx?flag=right', true);
    xmlRightHttpObj.onreadystatechange = fnGetRightUserList_after;
    xmlRightHttpObj.send(xmlRightParam);
}

function fnGetRightUserList_after() {
    if (xmlRightHttpObj == null || xmlRightHttpObj.readyState != 4) {
        return;
    }

    if ('OK' == xmlRightHttpObj.statusText || 200 == xmlRightHttpObj.status) {
        isSourceXmlPopup = false;

        fnSelectAccessTargetListCallback(xmlRightHttpObj.responseText);
    }
}

function Window_Close() { //20180619 ahh 팝업 창 닫기 공통함수 추가
    try {
        if (GetPageType() == "LAYER") {
            Layer_Close();
        } else {
            window.close();
        }
    } catch (e) { window.close(); }
}

function ReturnFunctionWithClose(ReturnFunction, rtn) {
    ReturnFunction(rtn);
    if (typeof(Window_Close) != "undefined") {
        Window_Close();
    }
}

function AllOpener_Close(PopupArray) {
	if (typeof(PopupArray) != "undefined" && PopupArray.length > 0) {
		for (var i = 0; i < PopupArray.length; i++) {    
			if (typeof(PopupArray[i].location.href) == "unknown"){ //20181217 ahh
				PopupArray[i] = null;
				continue;
			}
			PopupArray[i].Window_Close();
		}
	}
}

function CommonPopUp(pUrl, pWidth, pHeight, PopName, PopType, ExPopType) {
	if (typeof(ExPopType) != "undefined" && ExPopType != "") {
		if (ExPopType == "DIV") {
			DivPopUpShow(pWidth, pHeight, pUrl);
		}
        else if (ExPopType == "OPEN") {
            try {
                var OpenWin = window.open(pUrl, PopName, GetOpenWindowfeature(pWidth, pHeight, true));
                if (pPopupArray.length == 0) {
                    pPopupArray[0] = OpenWin;
                }
                else {
                    pPopupArray[pPopupArray.length] = OpenWin;
                }
            }
            catch (e) { }
			try { OpenWin.focus(); } catch (e) { }
		}
	}
	else {
		if (PopType == "DIV") {
			DivPopUpShow(pWidth, pHeight, pUrl);
		}
        else if (PopType == "OPEN") {
            try {
			var OpenWin = window.open(pUrl, PopName, GetOpenWindowfeature(pWidth, pHeight, true));
			if (pPopupArray.length == 0) {
				pPopupArray[0] = OpenWin;
			}
			else {
				pPopupArray[pPopupArray.length] = OpenWin;
                }
            }
            catch (e) { }
			try { OpenWin.focus(); } catch (e) { }
		}
	}    
}

function toggleClass(clickEle) { //20180718 ahh 메뉴 토글
    try {
        var selEle = document.getElementsByClassName("li_text on");

        for (var i = 0 ; i < selEle.length ; i++) {
            selEle[i].className = selEle[i].className.replace(" on", "");
        }

        if (clickEle != null && clickEle.getElementsByClassName("li_text").length == 1) {
            clickEle.getElementsByClassName("li_text")[0].className = "li_text on";
        }
    } catch (e) { }
}

//20180628 ahh 임시용 전자결재 공통함수
function CommonTotalSave(pDocID, pType) { //20180622 ahh 통합 PC 저장
    var pUrl = "/myoffice/ezApprovalG/TotalSaveFileInfo.aspx?docid=" + pDocID + "&type=" + pType;
    var pWidth = 600, pHeight = 450;
    CommonPopUp(pUrl, pWidth, pHeight, "TotalSaveFileInfo", PopupStyle);
}

function CommonPopUpOpinion() { //20180625 ahh 의견창
    var pUrl = "/myoffice/ezApprovalG/ezAPROPINION/AprOpinion.aspx";
    var pWidth = 530, pHeight = 520;
    CommonPopUp(pUrl, pWidth, pHeight, "AprOpinion", PopupStyle);
}

function CommonPopUpHistory() { //20180625 ahh 변경내역
    var pUrl = "/myoffice/ezApprovalG/ezAPRHISTORY/ezAPRHISTORY.aspx?DocID=" + pDocID;
    var pWidth = 730, pHeight = 430;
    CommonPopUp(pUrl, pWidth, pHeight, "ezAPRHISTORY", PopupStyle);
}

function CommonPopUpAprDocAttach(DraftFlag) { //20180625 ahh 문서첨부
    var pDraftFlag = "";
    if (typeof(DraftFlag) != "undefined")
        pDraftFlag = DraftFlag;

    var pUrl = "/myoffice/ezApprovalG/ezAprDocAttach/aprCabinetAttach.aspx?" + "DraftFlag=" + pDraftFlag;
    var pWidth = 800, pHeight = 470;
    CommonPopUp(pUrl, pWidth, pHeight, "aprCabinetAttach", PopupStyle);
}

function CommonPopUpDocInfo(pDocID, pType) { //20180625 ahh 정보
    var pUrl = "/myoffice/ezApprovalG/ezDocInfo/ezDocInfoG_View.aspx?DocID=" + pDocID + "&IngFlag=" + pType;
    var pWidth = 420, pHeight = 460;
    CommonPopUp(pUrl, pWidth, pHeight, "ezDocInfoG_View", PopupStyle);
}

function CommonPopUpApprovalInfo(pUrl) { //20180625 ahh 결재정보
    var pWidth = 1000, pHeight = 750;
    CommonPopUp(pUrl, pWidth, pHeight, "ezApprovalInfo", PopupStyle);
}

function CommonPopUpGongRamLine(pType) { //20180625 ahh 결재정보
    var pUrl = "/myoffice/ezApprovalG/ReceivUI/AprGongRamLine.aspx?type=" + pType;
    var pWidth = 1000, pHeight = 650;
    CommonPopUp(pUrl, pWidth, pHeight, "AprGongRamLine", PopupStyle);
}

function CommonPopUpReceiveAssign() { //20180625 ahh 지정
    var pUrl = "/myoffice/ezApprovalG/ezAPRRECEIVE/ezReceiveAssignUI.aspx";
    var pWidth = 460, pHeight = 375;
    CommonPopUp(pUrl, pWidth, pHeight, "ezReceiveAssignUI", PopupStyle);
}

function CommonPopUpReceiveDistribute() { //20180625 ahh 배부
    var pUrl = "/myoffice/ezApprovalG/ezAPRRECEIVE/ezReceiveDistributeUI.aspx";
    var pWidth = 1000, pHeight = 740;
    CommonPopUp(pUrl, pWidth, pHeight, "ezReceiveAssignUI", PopupStyle);
}

function CommonPopUpPrint() { //20180625 ahh 인쇄
    var pUrl = "/myoffice/ezApprovalG/printer/ezApproval_Print.aspx";
    var pWidth = 800, pHeight = 700;
    CommonPopUp(pUrl, pWidth, pHeight, "ezApproval_Print", PopupStyle);
}

var getCookie = function (name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
};

// 자동 화면 잠금 처리
(function GetAutoUserLockInfo() {
    if (window.location.pathname.toLowerCase().indexOf("/myoffice/") < 0) {
        // 인증 처리안된 페이지는 리턴처리.
        return;
    }

    var xmlHttp_AutoUserLock = new createXMLHttpRequest();
    var xmlpara_AutoUserLock = createXmlDom();
    var objNode;
    createNodeInsert(xmlpara_AutoUserLock, objNode, "PARAMATER");
    createNodeAndInsertText(xmlpara_AutoUserLock, objNode, "INCLUDE", "/myoffice/Common/AutoUserLock.js");
    xmlHttp_AutoUserLock.open("POST", "/myoffice/ezPortal/interASP/GetAutoUserLockInfo.aspx", false);
    xmlHttp_AutoUserLock.send(xmlpara_AutoUserLock);

    if (xmlHttp_AutoUserLock.status == 200) {
        var xmlDOM_AutoUserLock = loadXMLString(xmlHttp_AutoUserLock.responseText);
        if (getNodeText(xmlDOM_AutoUserLock) == "ERROR") {
            return;
        }
        else if (getNodeText(xmlDOM_AutoUserLock.getElementsByTagName("LOCKTIME")[0]) == "" || getNodeText(xmlDOM_AutoUserLock.getElementsByTagName("LOCKTIME")[0]) == "0") {
            return;
        }
        else {
            var thisUserid = getNodeText(xmlDOM_AutoUserLock.getElementsByTagName("USERID")[0]);
            var autoLockTime = getNodeText(xmlDOM_AutoUserLock.getElementsByTagName("LOCKTIME")[0]);
            var languageType = getNodeText(xmlDOM_AutoUserLock.getElementsByTagName("LANGTYPE")[0]);
            var includeFileName = getNodeText(xmlDOM_AutoUserLock.getElementsByTagName("INCLUDE")[0]);
            loadjscssfile(includeFileName, "js", "if(typeof jscssfile_removecheck == 'function') { jscssfile_removecheck(); } StartAutoUserLock('" + thisUserid + "', '" + autoLockTime + "', '" + languageType + "');");
        }
    }
})();


function validatedate(inputText) {  
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](19|20)\d\d$/;
  
    // Match the date format through regular expression
   // if (inputText.match(dateformat)) {
    if (dateformat.test(inputText)) {
       
        //Test which seperator is used '/' or '-'
        var opera1 = inputText.split('/');
        var opera2 = inputText.split('-');
        lopera1 = opera1.length;
        lopera2 = opera2.length;
        // Extract the string into month, date and year
        if (lopera1 > 1) {
            var pdate = inputText.split('/');
        }
        else if (lopera2 > 1) {
            var pdate = inputText.split('-');
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {           
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {          
                return false;
            }
            if ((lyear == true) && (dd > 29)) {              
                return false;
            }
        }
        return true;
    }
    else {           
        return false;
    }
}

String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function (item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

var Confirm_Alert_Delete_dialogArgument = new Array();
function Confirm_Alert_Delete_Message(pInformationContent, CompleteFunction, Type) {
    var parameter = pInformationContent;
    var url = "/myoffice/Common/Confirm_Message_Delete.aspx";
    Confirm_Alert_Delete_dialogArgument[0] = parameter;

    if (CompleteFunction != null)
        Confirm_Alert_Delete_dialogArgument[1] = CompleteFunction;
    else
        Confirm_Alert_Delete_dialogArgument[1] = Confirm_Alert_Message_Complete;

    if (Type == "OPEN") {
        GetOpenWindow(url + "?type=open", "Confirm_Message", 300, 204, "NO");
    }
    else {
        DivPopUpShow(300, 204, url);
    }
}

function orgimageview(obj) {
    if (obj != null && typeof obj != "undefined") {
        var orgFileName = GetAttribute(obj, "orgfilename");

        if (orgFileName != "") {
            var boardid = "";
            var itemid = "";

            if (boardid == "" || itemid == "") {
                try {
                    boardid = parent.pBoardID;
                    itemid = parent.pItemID;
                } catch (e) { }
            }
            if (boardid == "" || itemid == "") {
                try {
                    boardid = opener.pBoardID;
                    itemid = opener.pItemID;
                } catch (e) { }
            }
            if (boardid == "" || itemid == "") {
                try {
                    boardid = pBoardID;
                    itemid = pItemID;
                } catch (e) { }
            }

            if (boardid != "" && itemid != "") {
                var url = "/myoffice/ezBoardSTD/OriginalImageView.aspx?boardid=" + boardid + "&itemid=" + itemid + "&orgfilename=" + orgFileName;
                GetOpenWindow(url, "OriginalImageView", 1200, 900, "YES");
            }
        }
    }
}