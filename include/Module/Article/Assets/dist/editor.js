(()=>{var e,a,t,n,l,d,s,i=window.__,c=i.Article;c.data||(c.data={});var o=$('<form class="needs-validation">').append((null===(e=c.data)||void 0===e?void 0:e.id)&&$('<div class="mb-3 py-2">ID : '.concat(c.data.id,"</div>"))).append($('<div class="mb-3">').append($('<label class="d-block">').append("Enter title:").append('<input class="form-control" type="text" name="title" placeholder="Enter title" pattern="[a-zA-Z\\s]{5,}" invalid-message="Please enter title" value="'.concat((null===(a=c.data)||void 0===a?void 0:a.title)||"",'">'))).append('<div class="invalid-feedback">Please enter title with at least 5 characters a-z</div>')).append($("<div class='mb-3'>").append($("<label class='d-block'>").append("Enter slug:").append('<input class="form-control" type="text" name="slug" placeholder="Enter slug" value="'.concat((null===(t=c.data)||void 0===t?void 0:t.slug)||"",'">')))).append($("<div class='mb-3'>").append($('<label class="d-block">').append("Enter keywords:").append('<input class="form-control" type="text" name="keywords" placeholder="Enter keywords" value="'.concat((null===(n=c.data)||void 0===n?void 0:n.keywords)||"",'">')))).append($("<div class='mb-3'>").append($("<label class='d-block'>").append("Enter description:").append('<textarea class="form-control" name="description" placeholder="Enter description">'.concat((null===(l=c.data)||void 0===l?void 0:l.description)||"","</textarea>")))).append($("<div class='mb-3'>").append($("<label class='d-block'>").append("Enter category:").append('<input class="form-control" type="text" name="category" placeholder="Enter category" value="'.concat((null===(d=c.data)||void 0===d?void 0:d.category)||"",'">')))).append($("<div class='mb-3'>").append($("<label class='d-block form-check'>").append('<input class=\'form-check-input\' type="checkbox" name="status" '.concat(null!==(s=c.data)&&void 0!==s&&s.status?"checked":"",">")).append("<span class='form-check-label'>Publish</span>"))).append($('<div class="mb-3 d-flex">').append('<button type="submit" class="ms-auto btn btn-primary">Submit</button>'));$(o).find('[name="title"]').on("input",(function(){$(o).find('[name="slug"]').val($(this).val().split(/\s+/).filter((function(e){return e.length>0})).join("-").toLowerCase())})),editor.callback=function(e){var a=this,t=this.editor,n=t.Modal,l=!1;c.endpoints.save?(n.open({title:"Article Meta Data",attributes:{class:"my-class"}}),n.setContent($('<div class="form-article">').append(o)),n.onceClose((function(){l||a.reject("Action canceled")})),o.off("submit"),o.on("submit",(function(e){if(e.preventDefault(),console.clear(),o[0].checkValidity()){l=!0,t.Modal.close();var n=o.find('[name="title"]').val(),d=o.find('[name="slug"]').val(),s=o.find('[name="keywords"]').val(),p=o.find('[name="category"]').val(),r=o.find('[name="description"]').val(),u=o.find('[name="status"]').is(":checked")?1:0;i.http.post(c.endpoints.save,Object.assign(c.data.id?{id:c.data.id}:{},{title:n,slug:d,keywords:s,category:p,description:r,data:JSON.stringify(a.data),status:u})).then((function(e){if(c.data.id=e.data.id,window.history.replaceState&&c.endpoints.editURL){var t=c.endpoints.editURL.replace("{id}",e.data.id);window.history.replaceState(null,null,t)}a.resolve(e)})).catch((function(e){return a.reject(e)}))}else i.toast("Please enter valid data",5,"text-danger")}))):i.toast("Please set save endpoint",5,"text-danger")}})();