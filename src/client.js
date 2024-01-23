$.getJSON("/data.json", (data) => {
    const { events, projects, other_contacts } = data;

    // Timeline events
    const dates = $("#about-me-timeline");
    const card = $("#about-me-card");
    let eventSelected = 0;
    $("#about-me-card-title").text(events[0].title);
    $("#about-me-card-description").text(events[0].description);
    $("#about-me-card-img").css("background-image", `url(${events[0].img})`);
    for (let i = 0; i < events.length; i++) {
        const elt = $(`<span ${(i === 0) ? "selected" : ""}>${events[i].date}</span>`);
        dates.append(elt);
        $("#preload").append(`<img alt="" src="${events[i].img}">`);
        elt.on("click", () => {
            if (i !== eventSelected) {
                for (const e of $("#about-me-timeline span")) {
                    $(e).removeAttr("selected");
                }
                elt.attr("selected", "");
                eventSelected = i;
                card.css("opacity", 0);
                setTimeout(() => {
                    $("#about-me-card-title").text(events[i].title);
                    $("#about-me-card-description").text(events[i].description);
                    $("#about-me-card-img").css("background-image", `url(${events[i].img})`);
                    card.css("opacity", 1);
                }, 250);
            }
        });
    }

    // Projects
    const projectsElt = $("#projects-inside");
    let projectSelected = 0;
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const elt = $(`<div id="project-${i}" class="project${i === 0 ? ' selected' : ''}">
                            <div class="top" style="background-image: url('${project.img}');"></div>
                            <div class="side-text">${project.title} - ${project.subtitle}</div>
                            <div class="middle">
                                <h1>${project.title}</h1>
                                <h2>${project.subtitle}</h2>
                                <p>${project.description}</p>
                                <a href="${project.url}"><i class="gg-display-flex"></i> Lien vers le projet</a>
                                <br>
                                <a href="${project.code_url}"><i class="gg-terminal"></i> Lien vers le code</a>
                            </div>
                            <div style="background: ${project.color}"></div>
                        </div>`);
        projectsElt.append(elt);
        $("#preload").append(`<img alt="" src="${project.img}">`);
        elt.on("click", () => {
            if (i !== projectSelected) {
                $(`#project-${i} .side-text`).css("opacity", 0);
                $(`#project-${i} .middle`).css("opacity", 0);
                $(`#project-${i} .top`).css("opacity", 0);
                $(`#project-${projectSelected} .side-text`).css("opacity", 0);
                $(`#project-${projectSelected} .middle`).css("opacity", 0);
                $(`#project-${projectSelected} .top`).css("opacity", 0);
                setTimeout(() => {
                    for (const e of projectsElt.children()) {
                        e.className = "project";
                    }
                    elt.attr("class", "project selected");
                    setTimeout(() => {
                        $(`#project-${i} .side-text`).css("opacity", 1);
                        $(`#project-${i} .middle`).css("opacity", 1);
                        $(`#project-${i} .top`).css("opacity", 1);
                        $(`#project-${projectSelected} .side-text`).css("opacity", 1);
                        $(`#project-${projectSelected} .middle`).css("opacity", 1);
                        $(`#project-${projectSelected} .top`).css("opacity", 1);
                        projectSelected = i;
                    }, 500);
                }, 250);
            }
        });
    }
});