import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 56px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    text-indent: 10px;
    letter-spacing: 0.15px;

    flex-wrap: wrap;
    display: flex;
    align-items: center;

    margin-bottom: 30px;
    
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    
    color: rgba(0, 0, 0, 0.6);

    cursor: pointer;

    .dd-header {
        width: 98%;
        height: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        .arrow {
            font-size: 23px;
        }
    }

    .dd-list {
        width: 100%;

        padding: 0;
        margin: 0;
        
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;

        z-index:1;
            
        li {
            list-style-type: none;
            
            &:first-of-type {
                > button {
                    border-top: 1px solid #ccc;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                }
            }
            
            &:last-of-type > button {
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
            }

            button {
                width: 100%;
                height: 56px;
                
                font-size: 17px;
                text-align: left;
                text-transform: none;
                
                display: flex;
                justify-content: space-between;
                
                background-color: #e8e8e8;
                                
                box-sizing: border-box;

                border: 0;
                border-bottom: 1px solid #ccc;
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                border-radius: 0;

                &:hover, &:focus {
                    font-weight: bold;
                    
                    background-color: #ccc;

                    cursor: pointer;
                }

                span {
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
`