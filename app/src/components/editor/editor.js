import "../../helpers/iframeLoader.js";
import axios from 'axios';
import React, {Component} from 'react';
import DomHelper from "../../helpers/dom-helper";
import EditorText from "../editor-text";
import {Button} from 'react-bootstrap';
import Notification from "../alert";
import Spinner from '../spinner';
import ConfirmModal from "../confirm-modal";
import ChooseModal from "../choose-modal";
import Panel from "../panel";




export default class Editor extends Component{
    constructor() {
        super();
        this.currentPage = "index.html";
        this.state = {
            pageList: [],
            backupsList: [],
            newPageName: "",
            loading: true,
            saveShow: false,
            listShow: false,
            backupShow: false,
            alertShow: false

        }

        this.isLoading = this.isLoading.bind(this);
        this.isLoaded = this.isLoaded.bind(this);
        this.save = this.save.bind(this);
        this.init = this.init.bind(this);
        this.alertNotShow = this.alertNotShow.bind(this);
        this.sayHello = this.sayHello.bind(this);
        this.restoreBackup = this.restoreBackup.bind(this);
    }

    alertNotShow() {
        this.setState({ alertShow: true });
    }

    sayHello(){
        alert('sayHello');
    }

    componentDidMount() {
            this.init(null, this.currentPage);
    }

    init(e, page){
        if (e){
            e.preventDefault();
        }
        this.isLoading();
        this.iframe = document.querySelector('iframe');
        this.open(page, this.isLoaded);
        this.loadPageList();
        this.loadBackupsList();
    }

    open(page, callback){
        this.currentPage = page;

        axios
            .get(`../${page}?rnd=${Math.random()}`)
            .then(res => DomHelper.parseStrToDOM(res.data))
            .then(DomHelper.wrapTextNodes)
            .then(dom => {
                this.virtualDom = dom;
                return dom;
            })
            .then(DomHelper.serializeDOMToString)
            .then(html => axios.post("./api/saveTempPage.php", {html}))
            .then(() => this.iframe.load("../uuuffu1agg_hhgg.html"))
            .then(() => axios.post("./api/deleteTempPage.php"))
            .then(() => this.enableEditing())
            .then(() => this.injectStyles())
            .then(callback);

        this.loadBackupsList();
    }

   async save(onSuccess, onError) {
        this.isLoading();
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DomHelper.unwrapTextNodes(newDom);
        const html = DomHelper.serializeDOMToString(newDom);
        await axios
            .post("./api/savePage.php", {pageName: this.currentPage, html})
            .then(onSuccess)
            .catch(onError)
            .finally(this.isLoaded);

        this.loadBackupsList();

    }

    enableEditing(){
        this.iframe.contentDocument.body
            .querySelectorAll("text-editor")
            .forEach(element => {
                const id = element.getAttribute("nodeid");
                const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${id}"]`);
                    new EditorText(element, virtualElement);
                });
    }

    injectStyles(){
       const style = this.iframe.contentDocument.createElement("style")
        style.innerHTML = `
            text-editor:hover{
                outline: 3px solid orange;
                outline-offset 8px;
            }
            text-editor:focus{
                outline: 3px solid red;
                outline-offset 8px;
            }
        `;
        this.iframe.contentDocument.head.appendChild(style);
    }


    loadPageList(){
        axios
            .get("./api/pageList.php")
            .then(res => this.setState({pageList : res.data }));
    }

    loadBackupsList(){
        axios
            .get("./backups/backups.json")
            .then(res => this.setState({backupsList: res.data.filter(backup => {
                return backup.page === this.currentPage;
                })}))
    }

    restoreBackup(e, backup){
        if (e){
            e.preventDefault();
        }
        var backUpConfirm = confirm("Do you want restore page, without save?");
        if(backUpConfirm){
            // this.isLoading();
         return axios
               .post('./api/ ', {"page": this.currentPage, "file": backup})
             .then(() => {
                 this.open(this.currentPage, this.isLoaded);
             })
        }


    }


    isLoading(){
        this.setState({
            loading: true
        });
    }

    isLoaded(){
        this.setState({
            loading: false
        });
    }

    render() {

        const saveClose = () => this.setState({ saveShow: false });
        const listClose = () => this.setState({ listShow: false });
        const backupClose = () => this.setState({ backupShow: false });
        const alertShow = () => this.setState({ alertShow: false });


        const {loading, pageList, backupsList} = this.state;
        let spinner;

        loading ? spinner = <Spinner active/> : <Spinner/>;

        return(
            <>
                <iframe src="" frameBorder="0" ></iframe>

                 {spinner}

                <Notification show={this.state.alertShow} onHide={alertShow}/>
                 <Panel listShow={() => this.setState({ listShow: true })}
                        saveShow={() => this.setState({ saveShow: true })}
                        backupShow={() => this.setState({ backupShow: true })}
                 />

                <ConfirmModal show={this.state.saveShow} onHide={saveClose} method={this.save} alertShow={this.alertNotShow} />

                <ChooseModal show={this.state.listShow} onHide={listClose} data={pageList} redirect={this.init} />

                <ChooseModal show={this.state.backupShow} onHide={backupClose} data={backupsList} redirect={this.restoreBackup} />


            </>

        )
    }


}